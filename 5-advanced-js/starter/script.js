
( function () {
  let correctAnswer;
  let answerQuantity;
  let selectAnswer;
  let totalScore = 0;
  const questionsInfo = [
    {
      question: 'What\'s the capital of Portugal?',
      answerOptions: [
        'Porto',
        'Madrid',
        'Lisbon',
      ],
      correctAnswerIndex: 2,
    },
    {
      question: 'Which one is an european country?',
      answerOptions: [
        'Serbia',
        'Canada',
        'Australia',
        'South Korea',
      ],
      correctAnswerIndex: 0,
    },
    {
      question: 'How many countries are in the EU?',
      answerOptions: [
        15,
        28,
      ],
      correctAnswerIndex: 1,
    },
  ];

  function Question(questionObj) {
    let counter = 0;
    const correctAnswer = questionObj.correctAnswerIndex;
    const answerQuantity = questionObj.answerOptions.length;
    console.log(questionObj.question);
    questionObj.answerOptions.forEach((answer) => {
      console.log(`${counter}: ${answer}`);
      counter += 1;
    });
    return [correctAnswer, answerQuantity];
  }

  const portugalCaptl = Question.bind(
    this,
    questionsInfo[0]
  );

  const euroCountry = Question.bind(
    this,
    questionsInfo[1]
  );

  const countriesEU = Question.bind(
    this,
    questionsInfo[2]
  );

  const questionArr = [portugalCaptl, euroCountry, countriesEU];

  function displayQuestion(questionsArr) {
    const randomNum = Math.floor(Math.random() * questionsArr.length);
    const selectQuestion = questionsArr[randomNum];
    const getQuestionData = selectQuestion();
    correctAnswer = getQuestionData[0];
    answerQuantity = getQuestionData[1];
  }

  function checkCorrect() {
    displayQuestion(questionArr);
    // ask for the user's answer
    selectAnswer = window.prompt('Select the correct answer:');
    // check if player wants to exit game
    if (selectAnswer === 'exit') {
      console.log('Game exited. See you next time!');
    } else {
      selectAnswer = Number(selectAnswer);
      // check if input is valid
      while (!(Number.isInteger(selectAnswer) && selectAnswer < answerQuantity && selectAnswer >= 0)) {
        selectAnswer = Number(window.prompt('Select the correct answer:'));
      }
      if (selectAnswer === correctAnswer) {
        totalScore += 1;
        console.log('Congratulations! You selected the correct answer.');
        console.log(`Your total score is ${totalScore}.

    -----------------------------------------------
        
        `);
        checkCorrect();
      } else {
        console.log('Incorrect answer!');
        console.log(`Your total score is ${totalScore}.

    -----------------------------------------------
        
        `);
        checkCorrect();
      }
    }
  }
  checkCorrect();
}());
