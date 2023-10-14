export class QuestionManager {

    constructor(questions, players) {
        this.currentQuestion = -1;
        this.history = []
        this.players = players;
        this.questionSchema = questions.filter(question => (
                question.minPlayers <= players.length &&
                question.maxPlayers >= players.length
            )
        );
    }

    getQuestionNumber = () => {
        console.log(this.currentQuestion)
        return this.currentQuestion + 1;
    }

    replacePersonNames = (question) => {
        let usedNames = [];
        return question.text.replace(/&person&/g, () => {
            let newName;
            do {
                newName = this.players[Math.floor(Math.random() * this.players.length)];
            } while (usedNames.includes(newName));

            usedNames.push(newName);
            return newName;
        });
    }

    getNextQuestion = () => {
        if(this.currentQuestion === this.history.length - 1){

            const newQuestion = {
                text: '',
                schema: null,
            }

            do {
                newQuestion.schema = this.questionSchema[Math.floor(Math.random() * this.questionSchema.length)];
            } while ( newQuestion.schema === this.history[this.currentQuestion.schema] )

            newQuestion.text = this.replacePersonNames(newQuestion.schema);

            this.history.push(newQuestion)
        }

        this.currentQuestion += 1;
        return this.history[this.currentQuestion].text
    }

    getPreviousQuestion = () => {
        if(this.currentQuestion > 0){
            this.currentQuestion -= 1;
        }
        return this.history[this.currentQuestion].text;
    }

}