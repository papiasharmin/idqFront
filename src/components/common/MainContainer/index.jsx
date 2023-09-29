import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

/**
 * MainContainer コンポーネント
 * @param children 子コンポーネント
 */
const MainContainer = ({ children }) => {
      return(
            <Grid container direction="row" justifyContent="center" alignItems="center">
                  <Box sx={{ flexGrow: 1, overflow: "auto", px: 3, mt: 5,   }} >
                        {children}
                  </Box>
            </Grid>
      );
}

export default MainContainer;