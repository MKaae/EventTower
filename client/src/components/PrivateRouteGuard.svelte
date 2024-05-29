<script>
	import { useNavigate, useLocation } from "svelte-navigator";
	import { eventId } from "../stores/generalStore.js";

	const navigate = useNavigate();
	const location = useLocation();

	$: if ($eventId === null) {
		navigate("/", {
			state: { from: $location.pathname },
			replace: true,
		});
	}
</script>

{#if $eventId !== null}
	<slot />
{/if}