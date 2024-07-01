import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { Box, Container, Paper, Stack, Typography } from '@mui/material';
import { AdminPanelSettings as AdminPanelSettingsIcon, Group as GroupIcon, Message as MessageIcon, Notifications as NotificationsIcon, Person as PersonIcon } from '@mui/icons-material';
import moment from 'moment';
import { CurveButton, SearchFeild } from '../../components/styles/StyledComponent';
import { DoughnutChart, LineChart } from '../../components/specific/Charts';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

const fetchDummyData = async () => {
    // This is a dummy fetch function. Replace with your actual data fetching logic.
    return new Promise(resolve => setTimeout(() => resolve('Dummy Data'), 1000));
};

const Dashboard = () => {
    // Using a React Query hook to fetch data
    const { data, isLoading } = useQuery(['dummyData'], fetchDummyData);

    const Appbar = (
        <Paper elevation={3} sx={{ padding: "2rem", margin: "2rem 0", borderRadius: "1rem" }}>
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                <AdminPanelSettingsIcon sx={{ fontSize: "3rem" }} />
                <SearchFeild placeholder='Search...' />
                <CurveButton>Search</CurveButton>
                <Box flexGrow={1} />
                <Typography
                    display={{
                        xs: "none",
                        lg: "block",
                    }}
                    color={"rgba(0,0,0,0.7)"}
                    textAlign={"center"}
                >
                    {moment().format('dddd, D MMMM YYYY')}
                </Typography>
                <NotificationsIcon />
            </Stack>
        </Paper>
    );

    const Widgets = (
        <Stack
            direction={{
                xs: "column",
                sm: "row",
            }}
            spacing={"2rem"}
            justifyContent={"space-between"}
            alignItems={"center"}
            margin={"2rem 0"}
        >
            <Widget title={"Users"} value={34} Icon={<PersonIcon />} />
            <Widget title={"Chats"} value={33} Icon={<GroupIcon />} />
            <Widget title={"Messages"} value={324} Icon={<MessageIcon />} />
        </Stack>
    );

    return (
        <AdminLayout>
            <Container component={"main"}>
                {Appbar}
                <Stack
                    display={"flex"}
                    flexDirection={"row"}
                    gap={"1rem"}
                    justifyContent={"center"}
                    flexWrap={"wrap"}
                    direction={{ xs: "column", lg: "row" }}
                    alignItems={{
                        xs: "center",
                        lg: "stretch",
                    }}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            padding: "2rem 3.5rem",
                            borderRadius: "1rem",
                            width: "100%",
                            maxWidth: "42rem",
                        }}
                    >
                        <Typography margin={"2rem 0"} variant="h4">
                            Last Messages
                        </Typography>
                        <LineChart value={[23, 56, 72, 12, 33]} />
                    </Paper>
                    <Paper
                        elevation={3}
                        sx={{
                            padding: "1rem",
                            borderRadius: "1rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: { xs: "100%", sm: "50%" },
                            position: "relative",
                            width: "100%",
                            maxWidth: "25rem",
                        }}
                    >
                        <DoughnutChart labels={["Single Chat", "Group Chat"]} value={[23, 66]} />
                        <Stack
                            position={"absolute"}
                            direction={"row"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            spacing={"0.5rem"}
                            width={"100%"}
                            height={"100%"}
                        >
                            <GroupIcon /> <Typography>VS</Typography>
                            <PersonIcon />
                        </Stack>
                    </Paper>
                </Stack>
                {Widgets}
                {/* Displaying fetched data */}
                {isLoading ? <p>Loading...</p> : <p>Data: {data}</p>}
            </Container>
        </AdminLayout>
    );
};

const Widget = ({ title, value, Icon }) => (
    <Paper
        sx={{
            padding: "2rem",
            margin: "2rem 0",
            borderRadius: "1rem",
            width: "20rem",
        }}
    >
        <Stack alignItems={"center"} spacing={"1rem"}>
            <Typography
                sx={{
                    color: "rgba(0,0,0,0.7)",
                    borderRadius: "50%",
                    border: `5px solid rgba(0,0,0,0.9)`,
                    width: "5rem",
                    height: "5rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {value}
            </Typography>
            <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
                {Icon}
                <Typography>{title}</Typography>
            </Stack>
        </Stack>
    </Paper>
);

const DashboardWithProviders = () => (
    <QueryClientProvider client={queryClient}>
        <Dashboard />
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
);

export default DashboardWithProviders;
