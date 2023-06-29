import React, { FC, useState } from "react";
import style from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import useTheme from "../../context/Theme/useTheme";
import { RootState } from "../../store/Reducers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form } from "formik";
import TextField from "../../Components/TextField";
import Button from "../../Components/Button";
import SelectField from "../../Components/SelectFeild";
import { schema, unitOfMeasureSchema } from "../../schema";
import { addUnit, removeUnit, updateUnit } from "../../store/Actions";
type Props = {};
/**
 * ## Unit OF Measure
 * Unit of Measure the page that allow the use to manage the system units.
 * ```ts
 * type UnitOfMeasure = {
 * unitOfMeasureName: string,
 * baseUnitOfMeasure: string,
 * CFB: double,
 * }
 * ```
 * ### CFB
 * CFB or Conversion factor to the base unit of measure is the value of change from wieght to another in unit of measure (min to hour need 60 , 60 is the CFB)
 */
const UnitOfMeasurePage: FC = () => {
  const [status, setStatus] = useState<string>("add");
  const ufms = useSelector<RootState>(
    (state) => state.unitOfMeasureReducer
  ) as UnitOfMeasure[];
  const dispatch = useDispatch();
  const theme = useTheme();
  return (
    <div className={style.container}>
      <div
        className={style.cate}
        style={{
          backgroundColor: theme.palette.paper,
          boxShadow: "0 2px 8px" + theme.palette.shadow,
        }}
      >
        <div className={style.switcher}>
          <FontAwesomeIcon
            fontSize={24}
            color={theme.palette.textPrimary}
            cursor={"pointer"}
            icon={faAdd}
            onClick={() => setStatus("add")}
          />
          <FontAwesomeIcon
            fontSize={24}
            color={theme.palette.textPrimary}
            cursor={"pointer"}
            icon={faEdit}
            onClick={() => setStatus("update")}
          />
          <FontAwesomeIcon
            fontSize={24}
            color={theme.palette.textPrimary}
            cursor={"pointer"}
            icon={faTrashCan}
            onClick={() => setStatus("delete")}
          />
        </div>
        {status === "add" && (
          <Formik
            onSubmit={(values) => {
              dispatch(
                addUnit({
                  unitOfMeasureName: values.unitOfMeasureName,
                  baseUnitOfMeasure: values.baseOfUnitOfMeasure,
                  conversionFactor: values.CFB,
                })
              );
            }}
            initialValues={{
              unitOfMeasureName: "",
              baseOfUnitOfMeasure: "",
              CFB: 0,
            }}
            validationSchema={unitOfMeasureSchema}
          >
            <Form>
              <TextField
                id="unitOfMeasureName"
                name="unitOfMeasureName"
                placeholder="Enter Unit Of Measure Name"
                width="100%"
              />
              <TextField
                id="baseOfUnitOfMeasure"
                name="baseOfUnitOfMeasure"
                placeholder="Enter Base Unit Of Measure"
                width="100%"
              />
              <TextField
                id="CFB"
                name="CFB"
                placeholder="Enter Coversion Factor"
                width="100%"
              />
              <Button type="submit" fullWidth variant="error">
                Add
              </Button>
            </Form>
          </Formik>
        )}
        {status === "update" && (
          <Formik
            onSubmit={(values) => {
              console.log(values);
              dispatch(
                updateUnit(values.selectedUnit, {
                  unitOfMeasureName: values.unitOfMeasureName,
                  baseUnitOfMeasure: values.baseOfUnitOfMeasure,
                  conversionFactor: values.CFB,
                })
              );
            }}
            initialValues={{
              unitOfMeasureName: "",
              baseOfUnitOfMeasure: "",
              CFB: 0,
              selectedUnit: ufms[0].unitOfMeasureName,
            }}
            validationSchema={unitOfMeasureSchema}
          >
            <Form>
              <SelectField
                name="selectedUnit"
                width="100%"
                options={ufms.map((p) => {
                  return {
                    key: p.unitOfMeasureName,
                    value: p.unitOfMeasureName,
                  };
                })}
              />
              <TextField
                id="unitOfMeasureName"
                name="unitOfMeasureName"
                placeholder="Enter New Unit Of Measure Name"
                width="100%"
              />
              <TextField
                id="baseOfUnitOfMeasure"
                name="baseOfUnitOfMeasure"
                placeholder="Enter New Base Unit Of Measure"
                width="100%"
              />
              <TextField
                id="CFB"
                name="CFB"
                placeholder="Enter New Coversion Factor"
                width="100%"
              />
              <Button type="submit" fullWidth variant="error">
                Update
              </Button>
            </Form>
          </Formik>
        )}
        {status === "delete" && (
          <Formik
            onSubmit={(values) => {
              console.log("ha?");
              dispatch(removeUnit(values.unitOfMeasureName));
            }}
            initialValues={{ unitOfMeasureName: ufms[0].unitOfMeasureName }}
            validationSchema={schema}
          >
            <Form>
              <SelectField
                name="unitOfMeasureName"
                width="100%"
                options={ufms.map((p) => {
                  return {
                    key: p.unitOfMeasureName,
                    value: p.unitOfMeasureName,
                  };
                })}
              />
              <Button type="submit" fullWidth variant="error">
                Delete
              </Button>
            </Form>
          </Formik>
        )}
      </div>
    </div>
  );
};

export default UnitOfMeasurePage;
