    document.addEventListener("DOMContentLoaded", () => {
        const form = document.getElementById("loginForm");
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");
        const remember = document.getElementById("remember");
        const continueWithoutLogin = document.getElementById("continueWithoutLogin");
        const showPassword = document.getElementById("showPassword");

        showPassword.addEventListener("change", () => {
            passwordInput.type = showPassword.checked ? "text" : "password";
        });

      
        // Create message display
        let message = document.getElementById("loginMessage");
        if (!message) {
          message = document.createElement("div");
          message.id = "loginMessage";
          message.style.marginTop = "10px";
          message.style.fontWeight = "500";
          form.appendChild(message);
        }
      
        // Prefill email if remembered
        const rememberedEmail = localStorage.getItem("rememberedUser");
        if (rememberedEmail) {
          emailInput.value = rememberedEmail;
          remember.checked = true;
        }
      
        // Check for existing users or create new one
        form.addEventListener("submit", function (e) {
          e.preventDefault();
      
          const email = emailInput.value.trim();
          const password = passwordInput.value.trim();
      
          if (!email || !password) {
            message.style.color = "red";
            message.textContent = "⚠️ Email and password are required.";
            return;
          }
      
          // Load stored users or create new store
          const users = JSON.parse(localStorage.getItem("users")) || {};
      
          if (users[email]) {
            // Existing user: validate password
            if (users[email] === password) {
              message.style.color = "green";
              message.textContent = "✅ Login successful! Redirecting...";
              if (remember.checked) localStorage.setItem("rememberedUser", email);
              else localStorage.removeItem("rememberedUser");
      
              setTimeout(() => {
                window.location.href = "user.html";
              }, 1500);
            } else {
              message.style.color = "red";
              message.textContent = "❌ Incorrect password.";
            }
          } else {
            // New user: store credentials
            users[email] = password;
            localStorage.setItem("users", JSON.stringify(users));
            if (remember.checked) localStorage.setItem("rememberedUser", email);
      
            message.style.color = "green";
            message.textContent = "✅ New user created. Redirecting...";
            setTimeout(() => {
              window.location.href = "user.html";
            }, 1500);
          }
        });
      
        continueWithoutLogin.addEventListener("click", function (e) {
          e.preventDefault();
          window.location.href = "guest.html";
          alert('Continuing as guest user');
        });
      });
            
    // For demonstration of "Forgot password"
    const forgotPassword = document.querySelector('.forgot-password a');
    forgotPassword.addEventListener('click', function(event) {
        event.preventDefault();
        
        // For demo purposes
        alert('Password reset link sent to your email');
    });

