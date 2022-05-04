import {
	AppBar,
	Stack,
	Box,
	Container,
	Toolbar,
	Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Layout = function Layout({ pages, children }) {
	const location = useLocation();
	const { pathname } = location;

	return (
		<Box>
			<AppBar position='static' sx={{ backgroundColor: "#333333" }}>
				<Container maxWidth='xl'>
					<Toolbar disableGutters>
						<Stack
							direction='row'
							justifyContent='flex-start'
							alignItems='center'
							spacing={0}
							sx={{ width: "100%" }}
						>
							<Link to='/' style={{ textDecoration: "none" }}>
								<Typography
									sx={{
										m: "10px",
										color: pathname === "/" ? "gray" : "white",
										fontWeight: 700,
										":hover": { color: "gray" },
									}}
								>
									Home
								</Typography>
							</Link>

							{pages.map((page) => (
								<Link
									key={page.path}
									to={page.path}
									style={{ textDecoration: "none" }}
								>
									<Typography
										sx={{
											m: "10px",
											color: pathname === page.path ? "gray" : "white",
											fontWeight: 700,
											":hover": { color: "gray" },
										}}
									>
										{page.name}
									</Typography>
								</Link>
							))}
						</Stack>
					</Toolbar>
				</Container>
			</AppBar>

			<Box>
				<main style={{ margin: "40px" }}>{children}</main>
			</Box>
		</Box>
	);
};

export default Layout;
