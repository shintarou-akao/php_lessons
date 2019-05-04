<?php

require_once(__DIR__ . '/config.php');

$quiz = new MyApp\Quiz();

try {
  $correctAnswer = $quiz->checkAnswer();
} catch (Exception $e) {
  header($_SERVER['SERVER_PROTOCOL'] . ' 403 Forbidden', true, 403);
  echo $e->getMessage();
  exit;
}

header('Content-Type: application/json; charset=UTF-8');
echo json_encode([
  'correct_answer' => $correctAnswer
]);