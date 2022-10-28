export class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.numberOfQuestions = this.questions.length;
        this.currentQuestion = 0;
        this.score = 0;
        this.isCorrect = false;

        this.nextBtn = document.getElementById("next");
        this.nextBtn.addEventListener("click", this.nextQuestion.bind(this))

        document.getElementById("tryBtn").addEventListener("click", this.tryAgain);


        this.showQuestion()
    }

    showQuestion() {
        document.getElementById("question").innerHTML = this.questions[this.currentQuestion].question
        document.getElementById("currentQuestion").innerHTML = this.currentQuestion + 1;
        document.getElementById("totalNumberOfQuestions").innerHTML = this.numberOfQuestions;

        this.getAnswers()
    }

    getAnswers() {
        this.answers = [this.questions[this.currentQuestion].correct_answer, ...this.questions[this.currentQuestion].incorrect_answers]
        let currentIndex = this.answers.length,
            randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [this.answers[currentIndex], this.answers[randomIndex]] = [
                this.answers[randomIndex], this.answers[currentIndex]
            ];
        }

        this.temp = ``
        for (let i = 0; i < this.answers.length; i++) {
            this.temp += `
            <div class="form-check">
                <label class="form-check-label">
                    <input type="radio" class="form-check-input" name="answer" id="a${i}" value="${this.answers[i]}" >
                    ${this.answers[i]}
                </label>
            </div>
            `
        }
        document.getElementById("rowAnswer").innerHTML = this.temp;
    }

    checkAnswer() {
        let userAnswer = document.getElementsByName("answer");
        userAnswer = [...userAnswer].filter(el => el.checked)[0].value;
        let correct_answer = this.questions[this.currentQuestion].correct_answer;

        if (userAnswer == correct_answer) {
            this.score++;
            this.isCorrect = true;
        } else {
            this.isCorrect = false;
        }
    }

    nextQuestion() {
        this.checkAnswer();
        (this.isCorrect) ? $("#Correct").fadeIn(500, () => {
            $("#Correct").fadeOut(500)
        }): $("#inCorrect").fadeIn(500, () => {
            $("#inCorrect").fadeOut(500)
        })
        this.currentQuestion++;
        if (this.currentQuestion < this.numberOfQuestions) {
            this.showQuestion()
        } else {
            this.finish();
        }

    }

    finish() {
        $("#quiz").fadeOut(500, () => {
            $("#finish").fadeIn(500)
        })

        document.getElementById("score").innerHTML = this.score;
    }


    tryAgain() {
        $("#finish").fadeOut(500, () => {
            $("#setting").fadeIn(500)
        })
        location.reload()
    }






}