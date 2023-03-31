import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { ItemCard } from 'src/sections/companies/item-card';
import { ItemSearch } from 'src/sections/companies/item-search';
import items from 'dummy/product';
import { useRouter } from 'next/router';

const ArticleList = () => {
    //
    const router = useRouter();
    
    const writeArticle = () => {
        router.push('/article/write');
    }

    return (
        <>
            <Head>
                <title>
                    Items | KT&G
                </title>
            </Head>
            <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8
            }}
            >
            <Container maxWidth="xl">
                <Stack spacing={3}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    spacing={4}
                >
                    <Stack spacing={1}>
                    <Typography variant="h4">
                        Articles
                    </Typography>
                    <Stack
                        alignItems="center"
                        direction="row"
                        spacing={1}
                    >
                        <Button
                        color="inherit"
                        startIcon={(
                            <SvgIcon fontSize="small">
                            <ArrowUpOnSquareIcon />
                            </SvgIcon>
                        )}
                        >
                        Import
                        </Button>
                        <Button
                        color="inherit"
                        startIcon={(
                            <SvgIcon fontSize="small">
                            <ArrowDownOnSquareIcon />
                            </SvgIcon>
                        )}
                        >
                        Export
                        </Button>
                    </Stack>
                    </Stack>
                    <div>
                    <Button
                        startIcon={(
                        <SvgIcon fontSize="small">
                            <PlusIcon />
                        </SvgIcon>
                        )}
                        variant="contained"
                        onClick={writeArticle}
                    >
                        Add
                    </Button>
                    </div>
                </Stack>
                <ItemSearch />
                <Grid
                    container
                    spacing={3}
                >
                    
                </Grid>
                <Box
                    sx={{
                    display: 'flex',
                    justifyContent: 'center'
                    }}
                >
                    <Pagination
                    count={3}
                    size="small"
                    />
                </Box>
                </Stack>
            </Container>
            </Box>
        </>
    )
}

ArticleList.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
);

export default ArticleList;