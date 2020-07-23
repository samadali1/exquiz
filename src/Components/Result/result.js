import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '6px 16px',
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
}));

export default function Result(props) {
    const classes = useStyles();

    return (
        <Timeline align="alternate">
            <TimelineItem>
                <TimelineOppositeContent>

                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot>
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <Paper elevation={3} className={classes.paper}>
                        <Typography variant="h6" component="h1">
                            {props.score}%
            </Typography>
                        <Typography>Your Score</Typography>
                    </Paper>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent>

                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot color="primary">
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <Paper elevation={3} className={classes.paper}>
                        <Typography variant="h6" component="h1">
                            {props.correct}
                        </Typography>
                        <Typography>Correct Answers</Typography>
                    </Paper>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot color="primary" variant="outlined">
                    </TimelineDot>
                    <TimelineConnector className={classes.secondaryTail} />
                </TimelineSeparator>
                <TimelineContent variant={'secondary'}>
                    <Paper elevation={3} className={classes.paper}>
                        <Typography variant="h6" component="h1">
                            {props.wrong}
                        </Typography>
                        <Typography>Wrong Answers</Typography>
                    </Paper>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot color="secondary">
                    </TimelineDot>
                </TimelineSeparator>
                <TimelineContent>
                    <Paper elevation={3} className={classes.paper}>
                        <Typography variant="h6" component="h1">
                            {props.totalQuestions}
                        </Typography>
                        <Typography>Total Questions</Typography>
                    </Paper>
                </TimelineContent>
            </TimelineItem>
        </Timeline>
    );
}