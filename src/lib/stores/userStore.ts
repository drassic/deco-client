import type { UserI } from '$lib/interfaces/User';
import { writable } from 'svelte/store';
import OnBoarding from '@metamask/onboarding'
import { ethers } from 'ethers';

function createStore() {
	const { subscribe, set, update } = writable<UserI>();

	let onBoarding: OnBoarding;

	let ethereum;

	function setAccount(accounts: string[]) {
		console.log(accounts);
		if (accounts.length == 0) {
			reset();
			return;
		}
		update((user) => {
			user.account = accounts[0];
			user.provider = new ethers.providers.Web3Provider(ethereum);
			console.dir(user)
			return user
		})
	}

	function reset() {
		set(
			{
				walletReady: OnBoarding.isMetaMaskInstalled(),
				account: '',
				provider: null
			}
		);
		ethereum = (window as any).ethereum;
		onBoarding = new OnBoarding();

		ethereum.on('accountsChanged', function (accounts) {
			// Time to reload your interface with accounts[0]!
			setAccount(accounts);
		});

		ethereum
			.request({ method: 'eth_accounts' })
			.then(accounts => {
				setAccount(accounts);
			})
			.catch((err) => {
				// Some unexpected error.
				// For backwards compatibility reasons, if no accounts are available,
				// eth_accounts will return an empty array.
				console.error(err);
			});
	}

	return {
		subscribe,
		set,
		reset: reset,
		initialize: reset,
		// initialized: initialized,
		// metaMaskInstalled: initialized && OnBoarding.isMetaMaskInstalled(),
		installMetaMask: () => onBoarding.startOnboarding(),
		login: async () => {
			const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
			setAccount(accounts);
		}
	};
}

export const userStore = createStore();