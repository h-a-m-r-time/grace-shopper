import React from 'react'
import { Button, TableCell, TableRow, Input } from '@material-ui/core/'

export default function CartItem (props) {
    const item = props.item
    return (
            <TableRow key={item.id}>
                <TableCell>{item.opinion ? item.opinion.statement : 'Dat New New'}</TableCell>
                <TableCell>
                <TableCell><Input placeholder="What Is It Worth?" value={item.amount} onChange={ev => {props.handleChange(item, ev)}} /></TableCell>
                </TableCell>
                <TableCell>
                    <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        onClick={() => props.handleDelete(item.id)}
                    >
                        <small>Delete</small>
                    </Button>
                </TableCell>
            </TableRow>
    )
}
