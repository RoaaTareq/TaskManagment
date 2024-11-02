import React from 'react';
import PropTypes from 'prop-types';
import { Table as BootstrapTable } from 'react-bootstrap';


const Table = ({ columns, data, striped = true, bordered = true, hover = true, responsive = true }) => {
    return (
        <BootstrapTable
            striped={striped}
            bordered={bordered}
            hover={hover}
            responsive={responsive}
            className="custom-table"
        >
            <thead>
                <tr>
                    {columns.map((col, index) => (
                        <th key={index}>{col.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
                    data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((col, colIndex) => (
                                <td key={colIndex}>{row[col.accessor]}</td>
                            ))}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={columns.length} className="text-center">
                            No data available
                        </td>
                    </tr>
                )}
            </tbody>
        </BootstrapTable>
    );
};

Table.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            header: PropTypes.string.isRequired,
            accessor: PropTypes.string.isRequired,
        })
    ).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    striped: PropTypes.bool,
    bordered: PropTypes.bool,
    hover: PropTypes.bool,
    responsive: PropTypes.bool,
};

export default Table;
