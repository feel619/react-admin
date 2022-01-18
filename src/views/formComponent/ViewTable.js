import React, { useMemo } from "react";

import DataTable from "react-data-table-component";
import FilterComponent from "./FilterComponent";

const ViewTable = props => {
    const columns = [
        {
            name: "role",
            selector: "role",
            sortable: true,
        },
        {
            name: "privileges",
            selector: "privileges",
            sortable: true
        },
        {
            name: "status",
            selector: "status",
            sortable: true,
        },
        {
            name: "created_at",
            selector: "created_at",
            sortable: true,
        },
        {
            name: "created_by",
            selector: "created_by.username",
            sortable: true,
        },
        {
            name: "Action",
            button: true,
            cell: row =>
                row.showButtons ? (
                    <>
                        <span
                            onClick={() => props.click(row.name)}
                            style={{ marginRight: "5px" }}
                        >
                            <i className="fa fa-edit" />
                        </span>
                        <span onClick={() => props.click(row.name)}><i className="fa fa-trash" /></span>
                    </>
                ) : null
        }
    ];

    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
        false
    );
    // const filteredItems = data.filter(
    //   item => item.name && item.name.includes(filterText)
    // );
    const filteredItems = props.data.filter(
        item =>
            JSON.stringify(item)
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) !== -1
    );

    const subHeaderComponent = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText("");
            }
        };

        return (
            <FilterComponent
                onFilter={e => setFilterText(e.target.value)}
                onClear={handleClear}
                filterText={filterText}
            />
        );
    }, [filterText, resetPaginationToggle]);

    return (
        <DataTable
            title=""
            columns={columns}
            data={filteredItems}
            defaultSortField="name"
            striped
            pagination
            subHeader
            subHeaderComponent={subHeaderComponent}
        />
    );
};

export default ViewTable;
