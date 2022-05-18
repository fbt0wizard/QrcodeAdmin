import React, { useState, useEffect } from "react";
import {
  Fab,
  Table,
  TableBody,
  Box,
  Container,
  TableHead,
  TableCell,
  Button,
  TableRow,
  Dialog,
  Chip,
  Typography,
} from "@mui/material";
import PaginationComponent from "../../../components/PaginationComponent";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Tittle from "../../../components/Tittle";
import { useSelector, useDispatch } from "react-redux";
import { axiosGet } from "../../../functions/apiCalls";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { setProducts } from "../../../redux_toolkit/slices/dataSlice";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CreateProduct from "../../../components/CreateProduct";
import {
  setloader,
  setTotalPage,
} from "../../../redux_toolkit/slices/paginationSlice";
import GeneralFilterNav from "../../../components/GeneralFilterNav";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products, refetch } = useSelector((state) => state.data);
  const { productPag } = useSelector((state) => state.pagination);

  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [noRecord, setNoRecord] = useState(false);

  let count = productPag.start + 1;

  useEffect(() => {
    setNoRecord(false);
    if (productPag.showLoader) {
      dispatch(setProducts([]));
    }
    dispatch(setloader(false));

    const payload = {
      limit: `${productPag.start},${productPag.end}`,
      name: name,
      status: status,
      type: "products",
    };

    axiosGet("products", payload, false).then((res) => {
      switch (res.data.status) {
        case 200:
          dispatch(setTotalPage(Math.ceil(res.data.count / 12)));
          dispatch(setProducts(res.data.data));
          break;
        case 404:
          // dispatch(setProducts([]));
          setNoRecord(true);
          break;
        default:
          console.log(res);
      }
    });
  }, [refetch, productPag.start, name, status]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setName(data.get("search"));
    setStatus(data.get("status"));
    // console.log(data.get("search"), data.get("status"));
  };

  const pending = Object.keys(products).length === 0;

  return (
    <React.Fragment>
      <Dialog
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="Create Product"
      >
        <CreateProduct setModal={setModal}/>
      </Dialog>
      <Container
        maxWidth="lg"
        sx={{ borderRadius: 1, bgcolor: "#fff", boxShadow: 1, mb: 2 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            type="button"
            variant="contained"
            onClick={() => setModal(true)}
            endIcon={<AddCircleOutlineIcon />}
            sx={{
              m: 2,
              bgcolor: "#5c9499",
              "&:hover": {
                bgcolor: "#387075",
              },
            }}
          >
            Create Product
          </Button>
        </Box>
      </Container>
      <Tittle>Product List</Tittle>
      <GeneralFilterNav handleSearch={handleSearch} />
      <Box
        component="div"
        maxWidth="lg"
        sx={{
          p: "16px 0",
          m: "1rem 0",
          boxShadow: 1,
          borderRadius: 2,
          bgcolor: "#fff",
        }}
      >
        <Box
          component="div"
          sx={{ width: "95%", overflowX: "scroll", m: "auto" }}
        >
          <Table size="small" sx={{ minWidth: 935, mb: 5 }}>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>#</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!noRecord ? products.map((row) => (
                <TableRow key={row.uuid} className="__table_cell_bg">
                  <TableCell>{count++}</TableCell>
                  <TableCell>
                    <img
                      src={
                        row.images ? row.images : "assets/images/product.png"
                      }
                      alt={row.name}
                      style={{
                        width: "45px",
                        border: "1px solid #e3e6f0",
                        borderRadius: "50%",
                        padding: "5px",
                      }}
                    />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    {row.status === "1" ? (
                      <Chip
                        label="Active"
                        sx={{
                          width: "75px",
                          bgcolor: "green",
                          color: "#fff",
                          fontWeight: 600,
                        }}
                      />
                    ) : (
                      <Chip
                        label="Inactive"
                        sx={{
                          width: "75px",
                          bgcolor: "#f10000",
                          color: "#fff",
                          fontWeight: 600,
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell className="__money">
                    &#8358; {format(row.price)}
                  </TableCell>
                  <TableCell>{moment(row.created_at).format("LLL")}</TableCell>
                  <TableCell>
                    <Fab
                      aria-label="more"
                      size="small"
                      onClick={() =>
                        navigate(`/products/manageProduct/${row.uuid}`)
                      }
                      sx={{
                        zIndex: 1,
                        bgcolor: "#5c9499",
                        color: "#fff",
                        "&:hover": {
                          bgcolor: "#fff",
                          color: "#387075",
                        },
                      }}
                    >
                      <ChevronRightIcon />
                    </Fab>
                  </TableCell>
                </TableRow>
              )): null}
            </TableBody>
          </Table>
          {pending && (
            <div style={{ textAlign: "center" }}>
              <i
                style={{ fontSize: 40, margin: 18 }}
                className="fa fa-spinner fa-spin"
                aria-hidden="true"
              ></i>
            </div>
          )}
          {noRecord && (
            <div style={{ textAlign: "center" }}>
              <Typography
                variant="h6"
                color="#5c9499"
                sx={{ fontSize: 15, margin: 2 }}
              >
                No Record Found
              </Typography>
            </div>
          )}
        </Box>
      </Box>
      <PaginationComponent pagnitionData={productPag} />
    </React.Fragment>
  );

  function format (data){
    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
};

export default Products;
