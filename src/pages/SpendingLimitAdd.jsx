import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DatePicker from "react-mobile-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import dateCon from "../config/dateConfig";
import { useEffect, useState } from "react";
import { dateConfigNoDay } from "../config/dateConfig";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


function SpendingLimitAdd() {
  const navigate = useNavigate();
  const [category, setCategory] = useState(1);
  const [categories, setCategories] = useState("");
  const [money, setMoney] = useState(100000);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [dateData, setDateData] = useState({
    time: new Date(),
    isOpen: false,
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT_PRODUCT}/categories`)
      .then((res) => {
        setCategories(res.data.data.categories);
      });
  }, []);

  const handleClick = () => {
    setDateData({ isOpen: true });
  };

  const handleToggle = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setShowDatePicker(!showDatePicker);
  };


  const handleCancel = () => {
    setDateData({ isOpen: false });
  };

  const handleSelect = (time) => {
    setDateData({ time, isOpen: false });
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = async () => {
    await axios.post(`${process.env.REACT_APP_API_ENDPOINT_PRODUCT}/limits`, {
      limitMoney: money,
      date: `${dateData.time.getFullYear()}-${dateData.time.getMonth()}-01`,
      categoryId: category,
    });
    navigate("/spendings-limit");
  };
  return (
    <div className="home container">
      <Container className="spending-add-header">
        <ArrowBackIcon onClick={() => navigate(-1)} />
        <h2 className="spending-add-title">Thêm hạn mức chi tiêu</h2>
      </Container>
      <Container className="spending-add-body">
        <form>
          <input
            className="spending-add-money"
            type="number"
            name=""
            id=""
            placeholder="100.000 đ"
            onChange={(event) => setMoney(event.target.value)}
          />
          <div className="spending-add-form_wrapper">
            {/* <label className="spending-add-form_label">Chọn danh mục</label> */}
            <FormControl fullWidth>
              <Select
                value={category}
                onChange={handleChangeCategory}
                displayEmpty
                placeholder={"Category"}
                inputProps={{ "aria-label": "Without label" }}
              >
                {categories.length
                  ? categories.map((item) => (
                      <MenuItem value={item.id}>{item.name}</MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
            {/* <TextField
              className="spending-add-form_text"
              style={{ borderRadius: "20px !important" }}
              placeholder="Mua áo"
            /> */}
            <button className="spending-add-form_date"
               onClick={handleToggle}>{(dateData.time.getMonth() + 1).toString().padStart(2, '0')}/{dateData.time.getFullYear()}<KeyboardArrowDownIcon/></button>
            {showDatePicker && (
              <DatePicker
                showCaption={false}
                showHeader={false}
                value={dateData.time}
                isOpen={true}
                isPopup={false}
                onChange={handleSelect}
                onSelect={handleSelect}
                onCancel={handleCancel}
                theme={"ios"}
                dateFormat={["MM", "YYYY"]}
                confirmText=""
                cancelText=""
                dateConfig={dateConfigNoDay}
              />
          )}
            <Button onClick={handleSubmit} className="spending-add-form_button">
              Thêm Hạn Mức
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default SpendingLimitAdd;
