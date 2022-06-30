import { Stack, Typography } from "@mui/material";
import "../index.css";

const Home = function Home({ pages }) {
	return (
    
		<Stack
			direction='column'
			justifyContent='flex-start'
			alignItems='center'
			spacing={0}
			sx={{ width: "100%" }}
		>
			<Typography>This is Home page</Typography>
			<Typography>Yes it is</Typography>
		</Stack>
	
	
	);
	

};

export default Home;
