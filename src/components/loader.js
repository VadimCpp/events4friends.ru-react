import React from 'react';
import { Progress } from 'reactstrap';


export default function loader({ number, total }) {
    return <Progress value={number} max={total} />
}