<script>
  import { createForm } from "svelte-forms-lib";
  import * as yup from "yup";
  import { fetchPost } from "../../../util/api.js"
  import { BASE_URL } from "../../stores/generalStore.js"
  import { navigate, useLocation } from "svelte-navigator";
  import { user } from "../../stores/generalStore.js"
  import toast, {Toaster} from 'svelte-french-toast'

  let showSignUp = true;

  const location = useLocation();

  const {
    form: form1,
    errors: errors1,
    handleChange: handleChange1,
    handleSubmit: handleSubmit1,
  } = createForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      passwordconfirm: "",
    },
    validationSchema: yup.object().shape({
      username: yup.string().required("Username is required"),
      email: yup.string().email().required("Email is required"),
      password: yup.string().required("Password is required"),
      passwordconfirm: yup
        .string()
        .required("Confirm password is required")
        .test("Passwords must match", "Passwords must match", function (value) {
          return this.parent.password === value;
        }),
    }),
    onSubmit: async (values) => {
    const body = {
        username: values.username,
        email: values.email,
        password: values.password,
    };
    try {
        const result = await fetchPost($BASE_URL + "/signup", body);
        if(result === "Username already exists"){
        toast.error("Username already exists.", {
            position: "bottom-center"
        })}
        if(result === "Email already exists"){
        toast.error("Email already exists.", {
            position: "bottom-center"
        })
        } else { 
        toast.success("Signup successful, ready to login.", {
            position: "bottom-center"
        });
        showSignUp = false;
        }
    } catch (error) {
        if (error.status === 404) {
        toast.error("Signup endpoint not found (404).", {
            position: "bottom-center"
        });
        } else {
        toast.error("An unexpected error occurred.", {
            position: "bottom-center"
        });
        }
    }
    },
  });

  const {
    form: form2,
    errors: errors2,
    handleChange: handleChange2,
    handleSubmit: handleSubmit2,
  } = createForm({
    initialValues: {
      emaillogin: "",
      passwordlogin: "",
    },
    validationSchema: yup.object().shape({
      emaillogin: yup.string().email().required("Email is required"),
      passwordlogin: yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
    const body = {
        email: values.emaillogin,
        password: values.passwordlogin,
    };
    try {
        const result = await fetchPost($BASE_URL + "/login", body);
        if(result === "user" || result === "admin"){
        user.set(result);
        const from = ($location.state && $location.state.from) || "/";
        navigate(from, {replace: true});
        } else {
        toast.error("Error processing login.", {
            position: "bottom-center"
        });
        } 
    } catch (error) {
        if (error.status === 404) {
        toast.error("Login endpoint not found (404).", {
            position: "bottom-center"
        });
        } else {
        toast.error("An unexpected error occurred.", {
            position: "bottom-center"
        });
        }
    }
    },
  });
</script>

<div>
    <div 
    class="flip2 position-absolute flex-column p-4 border border-3 border-grey rounded shadow"
    style="transform: rotateY({showSignUp ? '-180deg' : '0deg'})"
    >
        <form on:submit={handleSubmit1}>
            <div class="text-center m-4">
                <h5>Sign up to eventtower</h5>
            </div>

            <div data-mdb-input-init class="form-outline mb-2">
            <label class="form-label" for="username">Username</label>
            <input 
            type="text" 
            class="form-control" 
            name="username" 
            placeholder="Enter username"
            on:change={handleChange1}
            on:blur={handleChange1}
            bind:value={$form1.username} 
            />
            {#if $errors1.username}
                <small class="text-danger">{$errors1.username}</small>
            {/if}
            </div>

            <div data-mdb-input-init class="form-outline mb-2">
            <label class="form-label" for="email">Email address</label>
            <input 
            type="email" 
            class="form-control" 
            name="email" 
            placeholder="Enter email"
            on:change={handleChange1}
            on:blur={handleChange1}
            bind:value={$form1.email} 
            />
            {#if $errors1.email}
                <small class="text-danger">{$errors1.email}</small>
            {/if}
            </div>
        
            <div data-mdb-input-init class="form-outline mb-2">
            <label class="form-label" for="password">Password</label>
            <input 
            type="password" 
            class="form-control" 
            name="password" 
            placeholder="Enter password" 
            on:change={handleChange1}
            on:blur={handleChange1}
            bind:value={$form1.password} 
            />
            {#if $errors1.password}
                <small class="text-danger">{$errors1.password}</small>
            {/if}
            </div>
            
            <div data-mdb-input-init class="form-outline mb-2">
            <label class="form-label" for="passwordconfirm">Password</label>
            <input 
            type="password" 
            class="form-control" 
            name="passwordconfirm" 
            placeholder="Confirm password" 
            on:change={handleChange1}
            on:blur={handleChange1}
            bind:value={$form1.passwordconfirm} 
            />
            {#if $errors1.passwordconfirm}
                <small class="text-danger">{$errors1.passwordconfirm}</small>
            {/if}
            </div>

            <div class="text-center">
                <button  
                type="submit" 
                data-mdb-button-init data-mdb-ripple-init 
                class="btn btn-primary btn-block mb-2">
                Sign in
                </button>
            </div>
        </form>
        <div class="text-center">
            <p>Already have account? 
                <button 
                id="login-form-btn"
                on:click={() => (showSignUp = !showSignUp)}
                class="btn btn-primary"
                >
                Login here
                </button>
            </p>
        </div>
    </div>
    <div 
    class="flip1 position-absolute p-4 border border-3 border-grey rounded shadow"
    style="transform: rotateY({showSignUp ? '0deg' : '180deg'})"
    >
        <form on:submit={handleSubmit2}>
            <div class="text-center m-4">
                <h5>Login to eventtower</h5>
            </div>

            <div data-mdb-input-init class="form-outline mb-2">
            <label class="form-label" for="email">Email address</label>
            <input 
            type="email" 
            class="form-control" 
            name="emaillogin" 
            placeholder="Enter email"
            on:change={handleChange2}
            on:blur={handleChange2}
            bind:value={$form2.emaillogin}    
            />
            {#if $errors2.emaillogin}
                <small class="text-danger">{$errors2.emaillogin}</small>
            {/if}
            </div>
        
            <div data-mdb-input-init class="form-outline mb-2">
            <label class="form-label" for="password">Password</label>
            <input 
            type="password" 
            class="form-control" 
            name="passwordlogin" 
            placeholder="Enter password" 
            on:change={handleChange2}
            on:blur={handleChange2}
            bind:value={$form2.passwordlogin}
            />
            {#if $errors2.passwordlogin}
                <small class="text-danger">{$errors2.passwordlogin}</small>
            {/if}
            </div>  

            <div class="text-center">
                <button  
                type="submit" 
                data-mdb-button-init data-mdb-ripple-init 
                class="btn btn-primary btn-block mb-2" 
                >Sign in</button>
            </div>
        </form>
        <div class="text-center">
            <p>Need an account? 
                <button 
                id="signup-form-btn"
                on:click={() => (showSignUp = !showSignUp)}
                class="btn btn-primary"
                >
                Sign up here
                </button>
            </p>
        </div>
    </div>
    <Toaster/>
</div>

<style>
    .flip1, .flip2 {
        backface-visibility: hidden;
    }
</style>