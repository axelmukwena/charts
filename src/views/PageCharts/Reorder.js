import React from "react";
import {
	Typography,
	Stack,
	FormControl,
	Select,
	MenuItem,
} from "@mui/material";
import { useLocation } from "react-router-dom";

const Reorder = function Reorder({ chartGroups, items, setItems }) {
	const location = useLocation();
	const { pathname } = location;

	const range = ({
		from = 0,
		to,
		step = 1,
		length = Math.ceil((to - from) / step),
	}) => Array.from({ length }, (_, i) => from + i * step);

	const getRankRange = () => {
		const end = items?.length;
		if (end) {
			const rankRange = range({ from: 1, to: end + 1 });
			return rankRange;
		}

		return [];
	};

	const getRatioRange = () => {
		const end = 4;
		const rankRange = range({ from: 1, to: end + 1 });

		return rankRange;
	};

	function shiftPosition(array, fromIndex, toIndex) {
		var element = array[fromIndex];
		array.splice(fromIndex, 1);
		array.splice(toIndex, 0, element);
		return array;
	}

	const handleRankChange = (event, index) => {
		const newRank = event.target.value;
		const shifted = shiftPosition(items, index, newRank - 1);

		const newItems = [];
		for (var i = 0; i < shifted.length; i++) {
			const item = shifted[i];
			item.rank = i + 1;
			newItems.push(item);
		}

		setItems(newItems);
	};

	const handleRatioChange = (event, index) => {
		const newRatio = event.target.value;

		const newItems = [];
		for (var i = 0; i < items.length; i++) {
			const item = items[i];
			if (i === index) {
				item.ratio = newRatio;
			}
			newItems.push(item);
		}
		setItems(newItems);
	};

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
		return null;
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
							direction='column'
							justifyContent='center'
							alignItems='center'
							spacing={2}
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
									minWidth: "192px",
									textAlign: "center",
								}}
							>
								Reorder: {chartPage.id}
							</Typography>

							<Stack
								direction='row'
								justifyContent='space-between'
								alignItems='center'
								spacing={2}
							>
								<Stack
									direction='row'
									justifyContent='flex-start'
									alignItems='center'
									sx={{
										p: "6px 0 6px 11px",
										borderRadius: "5px",
										backgroundColor: "white",
									}}
								>
									<Typography
										sx={{
											fontSize: "14px",
											fontWeight: 600,
										}}
									>
										Rank:
									</Typography>
									<FormControl
										sx={{
											m: "0",
											"& .MuiOutlinedInput-root": {
												border: "none",
												borderRadius: 0,
												"& .MuiSelect-select": {
													p: "0 30px 0 7px",
													color: "#000",
													fontSize: "14px",
													fontWeight: 700,
												},
												"& fieldset": {
													border: "none",
												},
											},
										}}
									>
										<Select
											value={chartPage.rank}
											displayEmpty
											onChange={(e) => handleRankChange(e, chartPage.rank - 1)}
										>
											{getRankRange().map((rank) => (
												<MenuItem
													key={rank}
													value={rank}
													sx={{
														color: "#000",
														fontSize: "14px",
														fontWeight: 700,
													}}
												>
													{rank}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Stack>

								<Stack
									direction='row'
									justifyContent='flex-start'
									alignItems='center'
									sx={{
										p: "6px 0 6px 11px",
										borderRadius: "5px",
										backgroundColor: "white",
									}}
								>
									<Typography
										sx={{
											fontSize: "14px",
											fontWeight: 600,
										}}
									>
										Ratio:
									</Typography>
									<FormControl
										sx={{
											m: "0",
											"& .MuiOutlinedInput-root": {
												border: "none",
												borderRadius: 0,
												"& .MuiSelect-select": {
													p: "0 30px 0 7px",
													color: "#000",
													fontSize: "14px",
													fontWeight: 700,
												},
												"& fieldset": {
													border: "none",
												},
											},
										}}
									>
										<Select
											value={chartPage.ratio}
											displayEmpty
											onChange={(e) => handleRatioChange(e, chartPage.rank - 1)}
										>
											{getRatioRange().map((ratio) => (
												<MenuItem
													key={ratio}
													value={ratio}
													sx={{
														color: "#000",
														fontSize: "14px",
														fontWeight: 700,
													}}
												>
													{ratio}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Stack>
							</Stack>
						</Stack>
					))}
				</Stack>
			))}
		</Stack>
	);
};

export default Reorder;
