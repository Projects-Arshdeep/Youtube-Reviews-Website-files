<?php
if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['id'])) {
    // Extract the input data
    $id = intval($_GET['id']);

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
    $sql = "SELECT id, video_title, video_url, review_text, summary_text, created_at FROM reviews WHERE id=$id";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo json_encode($result->fetch_assoc());
    } else {
        echo json_encode(array("error" => "No review found"));
    }

    // Close connection
    $conn->close();
} else {
    echo json_encode(array("error" => "Invalid request"));
}
?>

