import React, {useState} from "react";
import {Grid} from "@material-ui/core";

import {DatePicker} from "@material-ui/pickers";
import moment from "moment";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";

// const useStyles = makeStyles((theme: Theme) => ({
//     button: {
//         margin: theme.spacing(1),
//         border: "1px solid gray",
//         borderRadius: "5px"
//     },
//     icon: {marginBottom: "2px"}
// }));

interface JobDateFiltersProps {

}

const JobDateFilters: React.FunctionComponent<JobDateFiltersProps> = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (
        <Grid container
              direction="row"
              spacing={2}
              justify="flex-end"
              alignItems="center">
            <Grid item>
                <DatePicker
                    inputVariant={"outlined"}
                    size={"small"}
                    label="Start Date"
                    value={startDate}
                    onChange={(date: MaterialUiPickersDate) => setStartDate(date ? date.toDate() as Date : new Date())}
                    animateYearScrolling
                />
            </Grid>
            <Grid item>
                <DatePicker
                    inputVariant={"outlined"}
                    size={"small"}
                    label="End Date"
                    value={endDate}
                    onChange={(date: MaterialUiPickersDate) => setEndDate(date ? date.toDate() as Date : new Date())}
                    animateYearScrolling
                />
            </Grid>
        </Grid>
    )
}

export default JobDateFilters;