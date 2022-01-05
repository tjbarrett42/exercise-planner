import React from 'react';
import Card from '@mui/material/Card';
import CardContent from "@mui/material/CardContent";

const Exercise = (props) => {
    return (
        <Card>
            <CardContent>
                {props.name}
                <br/>
                {props.target}
            </CardContent>
        </Card>
    )
}

export default Exercise;