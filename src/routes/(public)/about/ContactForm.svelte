<script>
    let name = '';
    let email = '';
    let type = '';
    let message = '';

    async function handleSubmit(event) {
        event.preventDefault();

        // 1. Generate a random 4-digit number
        const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();

        // 2. Ask the user to repeat it
        const userInput = prompt(`Verification: Please type the number ${verificationCode} to send your message:`);

        // 3. Logic Gate: If they cancel or get it wrong, stop here.
        if (userInput === null) return; 
        if (userInput !== verificationCode) {
            alert("Incorrect code. Please try again.");
            return;
        }

        // 4. Proceed to backend if verified
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, type, message }),
            });

            if (response.ok) {
                alert("Feedback sent! Thanks for reaching out.");
                // Reset form
                name = ''; email = ''; type = ''; message = '';
            } else {
                const err = await response.json();
                alert(`Error: ${err.message}`);
            }
        } catch (e) {
            alert("Check your internet connection and try again.");
        }
    }
</script>

<form on:submit={handleSubmit}>
    <input type="text" bind:value={name} placeholder="Name" required />
    <input type="email" bind:value={email} placeholder="Email" required />
    
    <select bind:value={type} required>
        <option value="" disabled>Select Type</option>
        <option value="feedback">Feedback</option>
        <option value="bug">Bug Report</option>
    </select>

    <textarea bind:value={message} placeholder="Your message..." required></textarea>

    <button type="submit">Submit to Discord</button>
</form>