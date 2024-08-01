document.addEventListener('DOMContentLoaded', function() {
    const reviewForm = document.getElementById('reviewForm');
    
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const review = {
                title: document.getElementById('videoTitle').value,
                url: document.getElementById('videoUrl').value,
                review: document.getElementById('reviewText').value,
                summary: document.getElementById('summaryText').value,
            };
            
            fetch('http://your-ec2-instance/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(review)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Redirect to home page or display success message
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
    }
    
    fetch('http://your-ec2-instance/api/reviews')
        .then(response => response.json())
        .then(data => {
            const reviewsContainer = document.getElementById('reviews');
            data.forEach(review => {
                const reviewDiv = document.createElement('div');
                reviewDiv.classList.add('review');
                reviewDiv.innerHTML = `
                    <h3>${review.title}</h3>
                    <p><strong>Review:</strong> ${review.review}</p>
                    <p><strong>Summary:</strong> ${review.summary}</p>
                    <a href="${review.url}" target="_blank">Watch Video</a>
                `;
                reviewsContainer.appendChild(reviewDiv);
            });
        });
});
