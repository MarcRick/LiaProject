window.addEventListener('DOMContentLoaded', (event) => {
    const navButton = document.getElementById('nav-btn');

    // Function to show confirmation dialog
    const confirmNavigation = (event) => {
        event.preventDefault();
        event.returnValue = ''; // For modern browsers

        // Confirmation message
        const confirmationMessage = 'Are you sure you want to leave this page?';

        // Show confirmation dialog
        event.returnValue = confirmationMessage;
        return confirmationMessage;
    };

    // Event listener for the navigation button click
    navButton.addEventListener('click', (event) => {
        window.removeEventListener('beforeunload', confirmNavigation);

        // Add the confirmation listener only when the nav button is clicked
        window.addEventListener('beforeunload', confirmNavigation);
    });
});