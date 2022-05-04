import React from "react";
import { Typography, Stack } from "@mui/material";
import { useLocation } from "react-router-dom";

const Charts = function Charts({ chartGroups }) {
	const location = useLocation();
	const { pathname } = location;

	const stringToColour = (str) => {
		const string = String(str);
		var hash = 0;
		for (var i = 0; i < string.length; i++) {
			hash = string.charCodeAt(i) + ((hash << 5) - hash);
		}
		var colour = "#";
		for (var j = 0; j < 3; j++) {
			var value = (hash >> (j * 8)) & 0xff;
			colour += ("00" + value.toString(16)).substr(-2);
		}

		return colour;
	};

	if (!(chartGroups.length > 0)) {
		return "No charts";
	}

	return (
		<Stack
			direction='column'
			justifyContent='center'
			alignItems='center'
			spacing={5}
			sx={{ width: "100%" }}
		>
			{chartGroups.map((chartPages, index) => (
				<Stack
					key={`${pathname}-${index}`}
					direction='row'
					justifyContent='space-between'
					alignItems='center'
					spacing={5}
					sx={{ width: "100%" }}
				>
					{chartPages.map((chartPage) => (
						<Stack
							key={chartPage.id}
							direction='row'
							justifyContent='center'
							alignItems='center'
							sx={{
								width: "100%",
								minHeight: "300px",
								borderRadius: "10px",
								backgroundColor: stringToColour(chartPage.id),
							}}
						>
							<Typography
								sx={{
									p: "10px",
									borderRadius: "10px",
									backgroundColor: "#F5B041",
									color: "white",
									fontWeight: 700,
									fontSize: "16px",
									width: "fit-content",
								}}
							>
								{chartPage.query.name}: {chartPage.id}
							</Typography>
						</Stack>
					))}
				</Stack>
			))}
		</Stack>
	);
};

export default Charts;
