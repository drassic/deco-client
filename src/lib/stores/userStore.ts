import type { UserI } from '$lib/interfaces/User';
import { get, writable } from 'svelte/store';
import OnBoarding from '@metamask/onboarding'
import { ethers } from 'ethers';
import { dev } from '$app/env';
import { getRecentCourses, setRecentCourses } from '$lib/helpers/localStorage';
import { RegistarHelper } from '$lib/helpers/registarContract';

function createStore() {
	const { subscribe, set, update } = writable<UserI>();

	let onBoarding: OnBoarding;

	let ethereum;

	function addRecentCourse(course: string) {
		update((user) => {
			const older = user.recentCourses ? user.recentCourses : [];
			const courses = [course, ...older]
			user.recentCourses = courses;
			setRecentCourses(user.account, courses.slice(0, 100));
			return user
		})
	}

	async function loadRecentCourses(address: string) {
		const courses = await getRecentCourses(address);
		update((user) => {
			user.recentCourses = courses;
			return user
		})
	}

	async function setAccount(accounts: string[]) {

		// Already signed in
		if (accounts && accounts[0] === get(userStore).account) {
			return;
		}

		reset();
		if (accounts.length === 0) {
			return;
		}

		loadRecentCourses(accounts[0]);
		update((user) => {
			user.account = accounts[0];
			user.provider = new ethers.providers.Web3Provider(ethereum);
			user.regHelper = new RegistarHelper();
			return user
		})
	}

	function setupListeners() {
		ethereum.on('accountsChanged', function (accounts) {
			// Reload interface?
			setAccount(accounts);
		});

		// Get the account info if person has already linked account.
		ethereum
			.request({ method: 'eth_accounts' })
			.then(async (accounts: string[]) => {
				await setAccount(accounts);
			})
			.catch((err) => {
				// Some unexpected error.
				// For backwards compatibility reasons, if no accounts are available,
				// eth_accounts will return an empty array.
				console.error(err);
			})
			.finally(() => {
				update((user) => {
					user.loadedAccount = true;
					return user
				});
			})

		// Having troubles with metamask onboarding. Cannot login after onboarding.
		// "request" methods seem to not resolve...
		setTimeout(() => {
			if (!get(userStore).loadedAccount && !ethereum.chainId) {
				location.reload();
			}
		}, 1000)
	}

	function init(loaded: boolean = false) {
		set(
			{
				walletReady: OnBoarding.isMetaMaskInstalled(),
				account: '',
				loadedAccount: loaded,
				// provider is built with ethereum. Need to wait for metamask.
				provider: null,
				recentCourses: [],
				regHelper: null
			}
		);

		// Currently only setup to work with metamask
		ethereum = (window as any).ethereum;
		onBoarding = new OnBoarding();

		if (ethereum) {
			setupListeners();
		} else {
			// No ethereum so consider it loaded and not available.
			update((user) => {
				user.loadedAccount = true;
				return user
			});
		}

	}

	// Clear any sensitive user data
	function reset() {
		update((user) => {
			user.account = '';
			user.provider = null;
			user.regHelper = null;
			return user
		});
	}

	return {
		subscribe,
		reset: reset,
		initialize: init,
		addRecentCourse: addRecentCourse,
		installMetaMask: () => onBoarding.startOnboarding(),
		login: async () => {
			try {
				const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
				setAccount(accounts);
			} catch (e) {
				dev && console.error(e);
			}
		}
	};
}

export const userStore = createStore();