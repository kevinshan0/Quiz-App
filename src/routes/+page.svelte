<script lang="ts">
    import { onMount } from "svelte";
    import { useForm, validators, HintGroup, Hint, email, required, minLength, maxLength} from "svelte-use-form";
    import type { Validator } from "svelte-use-form";
    import type { ActionData } from "./$types";

    export let form: ActionData;

    let formapi = useForm();
    let type: string | boolean = false;
    let modal: HTMLDialogElement;

    const passwordMatch: Validator = (value) => {
        return value === $formapi.password?.value
        ? null
        : { passwordMatch: "Passwords do not match" };
    };

    onMount(() => {
        if (!form || !form.success) modal.showModal();
    })
</script>

<dialog class="modal" bind:this={modal}>
    <div class="card w-fit h-fit p-8 rounded-xl bg-primary fixed inset-0 m-auto">
        <!-- user selects whether to sign in or register -->
        {#if !type}
            <div class="flex flex-col gap-4">
                <button class="btn font-default bg-secondary text-secondary-content border-0 shadow" on:click={() => { type = "SIGN IN" }}>SIGN IN</button>
                <button class="btn font-default bg-secondary text-secondary-content border-0 shadow" on:click={() => { type = "REGISTER" }}> REGISTER</button>
                {#if form && !form.success}
                    <p class="font-default text-center text-white">Invalid<br/>Credentials</p>
                {/if}
            </div>

        {:else}
            <!-- sign in / register page -->
            <form use:formapi method="POST" id="form" action={`?/${type.toString().replaceAll(" ", "").toLowerCase()}`}
            class="flex flex-col items-center gap-4" >
                <h1 class="text-center text-3xl font-default font-black text-primary-content">{type}</h1>

                <input type="email" name="email" use:validators={[required, email]} placeholder="email" autocomplete={type == "REGISTER" ? "off" : "on"}
                class="p-1 font-default rounded-md text-center w-full bg-white placeholder-primary-content shadow"/>
                <HintGroup for="email">
                    <Hint on="required" class="font-default text-center text-white">This is a mandatory field</Hint>
                    <Hint on="email" class="font-default text-center text-white" hideWhenRequired>Email is not valid</Hint>
                    </HintGroup>
            
                <input type="password" name="password" use:validators={[required, minLength(6), maxLength(20)]} placeholder="password" autocomplete={type == "REGISTER" ? "off" : "on"}
                class="p-1 font-default rounded-md text-center w-full bg-white placeholder-primary-content shadow"/>
                <HintGroup for="password">
                    <Hint on="required" class="font-default text-center text-white">This is a mandatory field</Hint>
                    <Hint on="minLength" class="font-default text-center text-white" hideWhenRequired>This field requires at least 6 characters</Hint>
                    <Hint on="maxLength" class="font-default text-center text-white" hideWhenRequired>This field cannot exceed 20 characters</Hint>
                </HintGroup>

                {#if type == "REGISTER"}
                    <input type="password" name="confirm-password" use:validators={[required, minLength(6), maxLength(20), passwordMatch]} placeholder="confirm password" autocomplete="off"
                    class="p-1 font-default rounded-md text-center w-full bg-white placeholder-primary-content shadow"/>
                    <HintGroup for="confirm-password">
                        <Hint on="required" class="font-default text-center text-white">This is a mandatory field</Hint>
                        <Hint on="minLength" class="font-default text-center text-white" hideWhenRequired>This field requires at least 6 characters</Hint>
                        <Hint on="maxLength" class="font-default text-center text-white" hideWhenRequired>This field cannot exceed 20 characters</Hint>
                        <Hint on="passwordMatch" class="font-default text-center text-white" hideWhenRequired>Passwords do not match</Hint>
                    </HintGroup>
                {/if}
            
                <div class="flex flex-row-reverse w-full justify-between gap-x-4">
                    <button disabled={!$formapi.valid} form="form" type="submit"
                    class="btn grow h-2/3 font-default bg-secondary text-secondary-content border-0 shadow">{type}</button>
                    <button on:click={() => { type = false }}
                    class="btn grow h-2/3 font-default bg-secondary text-secondary-content border-0 shadow" >BACK</button>
                </div>
            </form>
        {/if}
    </div>
</dialog>