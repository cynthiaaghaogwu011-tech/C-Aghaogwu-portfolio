(function () {
    const API_BASE = window.location.hostname === "127.0.0.1"
        ? "http://127.0.0.1:3000"
        : "https://c-aghaogwu-backend.onrender.com";

    // Hide the page until the backend confirms the admin is logged in
    document.documentElement.style.visibility = "hidden";
    async function verifyAdmin() {
        try {
            const response = await fetch(`${API_BASE}/api/auth/check`, {
                method: "GET",
                credentials: "include",
                cache: "no-store"
            });
            if (!response.ok) throw new Error("Not authenticated");
            document.documentElement.style.visibility = "visible";
        } catch (error) {
            window.location.replace("adminlogin.html");
        }
    }

    verifyAdmin();
    // Re-check when the browser restores a page from its cache (back button after logout)
    window.addEventListener("pageshow", (event) => {
        if (event.persisted) {
            document.documentElement.style.visibility = "hidden";
            verifyAdmin();
        }
    });
})();