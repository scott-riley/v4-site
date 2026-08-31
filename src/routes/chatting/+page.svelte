<script>
	import { goto } from '$app/navigation';
	import Desktop from '$lib/components/Desktop.svelte';
	import Window from '$lib/components/Window.svelte';
	import ContactForm from '$lib/components/ContactForm.svelte';
	let { form } = $props();
</script>

<Desktop
	initialAbout={false}
	initialScott={true}
	initialLorna={true}
	initialMD={false}
	initialCourse={false}
	initialEmail={true}
>
	<Window filename="contact" initX={140} initY={20} large onClose={() => goto('/')}>
		<ContactForm {form} />
	</Window>
</Desktop>
