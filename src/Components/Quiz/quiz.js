import React, { useState, useEffect, useMemo } from 'react'
import questions from '../../Data/questions.json'
import Paper from '@material-ui/core/Paper';
import { ProgressBar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Rating from '@material-ui/lab/Rating';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import { ArrowRightAlt } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';
import Result from '../Result/result'
import Divider from '@material-ui/core/Divider';

const Quiz = () => {
    const [allData, setAllData] = useState([])
    const [selectedQuestion, setSelectedQuestion] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [answered, setAnswered] = useState(false)
    const [rightAnswered, setRightAnswered] = useState(false)
    const [stopQuiz, setStopQuiz] = useState(false)
    const [totalCorrectAnswered, setTotalCorrectAnswered] = useState(0)
    const [totalWrongAnswered, setTotalWrongAnswered] = useState(0)
    const [totalAnswered, setTotalAnswered] = useState(0)

    useEffect(() => {
        setAllData(questions)
    
        if (!stopQuiz) {
            const options = [decodeURIComponent(questions[currentIndex].correct_answer)]

            for (var i = 0; i < questions[currentIndex].incorrect_answers.length; i++) {
                options.push(decodeURIComponent(questions[currentIndex].incorrect_answers[i]))
            }
            function shuffle(arr) {
                var ctr = arr.length, temp, index;
                while (ctr > 0) {
                    index = Math.floor(Math.random() * ctr);
                    ctr--;
                    temp = arr[ctr];
                    arr[ctr] = arr[index];
                    arr[index] = temp;
                }
                return arr;
            }

            const optionsToDisplay = shuffle(options);
            const sQ = { ...questions[currentIndex] }
            sQ.options = optionsToDisplay
            if (questions[currentIndex].difficulty === 'hard') {
                sQ.rating = 3
            }
            else if (questions[currentIndex].difficulty === 'medium') {
                sQ.rating = 2
            }
            else {
                sQ.rating = 1
            }

            setSelectedQuestion(sQ)
        }

    }, [currentIndex])

    function handleOptionClick(value) {
        if (!answered) {

            setTotalAnswered(totalAnswered + 1)
            setAnswered(true)
            if (value === decodeURIComponent(selectedQuestion.correct_answer)) {
                setRightAnswered(true)
                setTotalCorrectAnswered(totalCorrectAnswered + 1)
            }
            else {
                setRightAnswered(false)
                setTotalWrongAnswered(totalWrongAnswered + 1)

            }
        }

    }

    function handleNext() {
        
        if ((currentIndex + 1) >= allData.length) {
            setStopQuiz(true)
        }
        else {
            setAnswered(false)
            setRightAnswered(null)
            setCurrentIndex(currentIndex + 1)
        }

    }


    return (
        <div className={'container'}>
            {stopQuiz ? <>
                <Paper elevation={3} className={'quizArea'}>
                    <Alert severity="info">It's Result Time</Alert>
                    <Result score={Math.round(totalCorrectAnswered / totalAnswered * 100)} totalQuestions={allData.length} correct={totalCorrectAnswered} wrong={totalWrongAnswered} />
                    <Button variant="contained" fullWidth color="secondary" className={'startAgainBtn'} onClick={()=>{window.location.reload()}}>
                        Start Again
                    </Button>
                </Paper>
            </> : <>
                    <ProgressBar striped variant="warning" now={selectedQuestion && (currentIndex + 1) / allData.length * 100} />
                    {selectedQuestion && <Paper elevation={3} className={'quizArea'}>
                        <div>
                            <h2>
                                Question {currentIndex !== null && currentIndex + 1} of {allData.length}
                            </h2>
                            <h6>Category : {decodeURIComponent(selectedQuestion.category)}</h6>
                            <Rating name="read-only" size="small" value={selectedQuestion.rating} readOnly />
                        </div>
                        <Divider style={{marginBottom:'20px'}} />
                        <div>
                            <p>
                                {decodeURIComponent(selectedQuestion.question)}
                            </p>

                        </div>
                        <div>
                            <div className={'optionsContainer'}>
                                {selectedQuestion && selectedQuestion.options.map((v, i) => {
                                    return <Chip
                                        label={v}
                                        onClick={() => { handleOptionClick(v) }}

                                        variant="outlined"
                                    />
                                })}
                            </div>


                            {answered && <div className={'alert'}>
                                <Alert severity={rightAnswered ? 'success' : "error"}>{rightAnswered ? 'Correct Answer, Well Done' : "Sorry, Wrong Answer"}</Alert>
                            </div>}

                            <div>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                    disabled={answered ? false : true}
                                    endIcon={<ArrowRightAlt />}
                                    onClick={() => { handleNext() }}
                                >
                                    Next
                        </Button>
                            </div>

                        </div>


                    </Paper>}

                    <div>
                        <div className={'scoreBarTxts'}>
                            <p>Score : {isNaN(Math.round(totalCorrectAnswered / totalAnswered * 100)) ? 0 : Math.round(totalCorrectAnswered / totalAnswered * 100)}%</p>
                            <p>Max Score : {Math.round((totalCorrectAnswered + (allData.length - totalAnswered)) / allData.length * 100)}</p>

                        </div>
                        <ProgressBar>
                            <ProgressBar striped variant="warning" now={Math.round(totalCorrectAnswered / allData.length * 100)} key={1} />
                            <ProgressBar variant="success" now={Math.round(totalCorrectAnswered / totalAnswered * 100)} key={2} />
                            <ProgressBar striped variant="danger" now={Math.round((totalCorrectAnswered + (allData.length - totalAnswered)) / allData.length * 100)} key={3} />
                        </ProgressBar>
                    </div>
                </>}
        </div>
    )
}

export default Quiz