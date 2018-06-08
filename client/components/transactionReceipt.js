import React from 'react'
import { TableCell, TableRow } from '@material-ui/core'

export default function Opinion (props) {
  const transaction = props.transaction
  return (
      <TableRow>
          <TableCell> {transaction.opinion.statement} </TableCell>
          <TableCell> {transaction.amount} </TableCell>
          <TableCell>{new Date(transaction.updatedAt).toLocaleDateString()}</TableCell>
      </TableRow>
  )
}
