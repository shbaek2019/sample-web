import Head from "next/head";
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { WriteComponent } from "src/sections/article/write-component";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import ArticleServiceInstance from "src/services/articleService";

const Page = (props) => {
  //
  const token = useSelector((state) => state.token);
  const router = useRouter();
  const param = router.query.articleId;
  const [articleInfo, setArticleInfo] = useState(null);

  useEffect(() => {
    async function fetchAndSetArticle() {
      const data = await ArticleServiceInstance.getArticlesById(param, token);
      setArticleInfo(data);
    }
    fetchAndSetArticle();
  }, []);

  return (
    <>
      <Head>
        <title>Modify Article | KT&G</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">Modify Article</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={12} lg={12}>
                  {articleInfo && <WriteComponent article={articleInfo} />}
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
