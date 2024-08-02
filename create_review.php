<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the raw POST data
    $rawData = file_get_contents("php://input");
    $decodedData = json_decode($rawData, true);

    // Extract the input data
    $video_title = $decodedData['video_title'];
    $video_url = $decodedData['video_url'];
    $review_text = $decodedData['review_text'];
    $summary_text = $decodedData['summary_text'];

    // Database connection details
    $servername = "database-1.cbasieyuw2tf.ca-central-1.rds.amazonaws.com";
    $username = "admin";
    $password = "Secret55";
    $dbname = "youtube_reviews";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die(json_encode(array("error" => "Connection failed: " . $conn->connect_error)));
    }

    // Prepare SQL query
    $sql = "INSERT INTO reviews (video_title, video_url, review_text, summary_text) VALUES ('$video_title', '$video_url', '$review_text', '$summary_text')";

    // Execute query
    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("message" => "New review created successfully"));
    } else {
        echo json_encode(array("error" => "Error: " . $sql . "<br>" . $conn->error));
    }

    // Close connection
    $conn->close();
} else {
    echo json_encode(array("error" => "Invalid request method"));
}
?>
