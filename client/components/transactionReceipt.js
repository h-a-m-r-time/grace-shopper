import React from 'react'
import { TableRow } from '@material-ui/core'

/**
 * Renders a table row that contains opinion information
 * @function TransactionReceipt
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered component
 */
export default function TransactionReceipt (props) {
  const transaction = props.transaction
  return (
      <TableRow>
          <td className="statement"> {transaction.opinion.statement} </td>
          <td className="amount"> {transaction.amount} </td>
          <td className="date">{new Date(transaction.updatedAt).toLocaleDateString()}</td>
      </TableRow>
  )
}
