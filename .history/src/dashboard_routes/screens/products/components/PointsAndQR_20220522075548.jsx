import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { axiosGet } from "../../../../functions/apiCalls";
import { setQrProducts } from "../../../../redux_toolkit/slices/dataSlice";
import { switchAwardPoint } from "../../../../redux_toolkit/slices/otherSlice";
import AwardPoint from "../../../../components/AwardPoint";
import DisplayQr from "../../../../components/DisplayQr";
import Loader from "../../../../components/loader/Loader";

const PointsAndQR = ({ picked, setModal2 }) => {
  const dispatch = useDispatch();
  const { qrAssignedProduct } = useSelector((state) => state.data);
  const [screen, setScreen] = useState(null);

  // 

  useEffect(() => {
    const payload = {
      product: picked[0].uuid,
    };

    axiosGet("products/generate/qr", payload, false).then((res) => {
      switch (res.data.status) {
        case 200:
          if (res.data.data[0].printed === 1) {
            setScreen(false);
            dispatch(switchAwardPoint(true));
          } else {
            setScreen(true);
            dispatch(
              setQrProducts({
                qr: res.data.data,
                // count: res.data.count,
                point: res.data.data[0].point,
              })
            );
            dispatch(switchAwardPoint(false));
          }
          break;
        case 404:
          setScreen(false);
          dispatch(switchAwardPoint(true));
          break;
        default:
          console.log(res.data);
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      {screen === false ? (
        <AwardPoint picked={picked} />
      ) : screen === true ? (
        <DisplayQr data={qrAssignedProduct} setModal2={setModal2} />
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
};

export default PointsAndQR;
