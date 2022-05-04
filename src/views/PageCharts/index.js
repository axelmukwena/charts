import { Stack, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Reorder from "./Reorder";
import Charts from "./Charts";

function initializeCharts(items) {
	const charts = [];
	let group = [];

	if (!items) {
		return [];
	}

	let count = 0;
	for (let i = 0; i < items.length; i += 1) {
		const chart = items[i];
		const next = items[i + 1]?.ratio;
		const prev = items[i - 1]?.ratio;
		const curr = items[i]?.ratio;

		console.log("count:", count, "curr:", curr);
		if (count >= curr) {
			console.log("group:", group);
			charts.push(group);
			count = 0;
			group = [];
		}

		if (prev) {
			if (prev === chart.ratio) {
				group.push(chart);
				count += 1;
				if (!next) {
					charts.push(group);
				}
			} else {
				charts.push(group);
				count = 0;
				group = [];
				group.push(chart);
				count += 1;
				if (!next) {
					charts.push(group);
				}
			}
		} else {
			group.push(chart);
			count += 1;
			if (!next) {
				charts.push(group);
			}
		}
	}

	console.log(charts);
	return charts;
}

const PageCharts = function PageCharts({ tmpItems }) {
	const [reorder, setReorder] = useState(false);
	const [items, setItems] = useState(tmpItems);
	const [chartGroups, setChartGroups] = useState([]);

	useEffect(() => {
		const groups = initializeCharts(items);
		setChartGroups(groups);
	}, [items]);

	const handleReorder = () => {
		setReorder(true);
	};

	const handleSaveChanges = () => {
		// setItems(null);
		setReorder(false);
	};

	return (
		<>
			<Stack
				direction='row'
				justifyContent='flex-end'
				alignItems='center'
				spacing={0}
				sx={{ width: "100%", mb: "40px" }}
			>
				{!reorder && (
					<Button variant='contained' onClick={handleReorder} sx={{}}>
						Reorder
					</Button>
				)}
				{reorder && (
					<Button variant='contained' onClick={handleSaveChanges} sx={{}}>
						Save Changes
					</Button>
				)}
			</Stack>

			{!reorder && <Charts chartGroups={chartGroups} />}
			{reorder && (
				<Reorder chartGroups={chartGroups} items={items} setItems={setItems} />
			)}
		</>
	);
};

export default PageCharts;
