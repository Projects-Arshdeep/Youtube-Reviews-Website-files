document.addEventListener('DOMContentLoaded', function () {
    const reviewsDiv = document.getElementById('reviews');
    if (reviewsDiv) {
        loadReviews();
    }

    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const review = {
                video_title: document.getElementById('videoTitle').value,
                video_url: document.getElementById('videoUrl').value,
                review_text: document.getElementById('reviewText').value,
                summary_text: document.getElementById('summaryText').value
            };

            fetch('/create_review.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(review)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Success: ' + data.message);
                if (reviewsDiv) {
                    loadReviews(); // Reload reviews after adding a new one
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Error: ' + error.message);
            });
        });
    }

    const updateReviewForm = document.getElementById('updateReviewForm');
    if (updateReviewForm) {
        updateReviewForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const review = {
                id: document.getElementById('updateId').value,
                video_title: document.getElementById('updateVideoTitle').value,
                video_url: document.getElementById('updateVideoUrl').value,
                review_text: document.getElementById('updateReviewText').value,
                summary_text: document.getElementById('updateSummaryText').value
            };

            fetch('/update_review.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(review)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Success: ' + data.message);
                if (reviewsDiv) {
                    loadReviews(); // Reload reviews after updating
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Error: ' + error.message);
            });
        });
    }

    const deleteReviewForm = document.getElementById('deleteReviewForm');
    if (deleteReviewForm) {
        deleteReviewForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const reviewId = document.getElementById('deleteId').value;

            fetch('/delete_review.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: reviewId })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Success: ' + data.message);
                if (reviewsDiv) {
                    loadReviews(); // Reload reviews after deleting
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Error: ' + error.message);
            });
        });
    }
});

function loadReviews() {
    fetch('/get_reviews.php')
        .then(response => response.json())
        .then(data => {
            const reviewsDiv = document.getElementById('reviews');
            reviewsDiv.innerHTML = '';

            data.forEach(review => {
                const reviewElement = document.createElement('div');
                reviewElement.className = 'review';

                reviewElement.innerHTML = `
                    <h3>${review.video_title}</h3>
                    <p><a href="${review.video_url}" target="_blank">${review.video_url}</a></p>
                    <p>${review.review_text}</p>
                    <p>${review.summary_text}</p>
                    <p>Created at: ${review.created_at}</p>
                `;

                reviewsDiv.appendChild(reviewElement);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error loading reviews: ' + error.message);
        });
}
