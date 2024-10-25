import { useNavigate } from "react-router-dom";
import { APISchedule } from "../apis/APISchedule"
import { useEffect, useRef, useState } from "react";

const ScheduleList = ({ scheduleId, item, index}) => {
        useEffect(() => {
            setScheduleDesc(item.desc);
          }, [item]);

        const id = index.toString();
        const navigate = useNavigate();
        const [scheduleDesc,setScheduleDesc] = useState();
        const [isEditable,setIsEditable] = useState(false);
        const inputRef = useRef(null);
        
        
        function handleEdit() {
            setIsEditable(true);
        };

        function handleSave() {
            setIsEditable(false);
            APISchedule.updateScedulebyId(scheduleId,id,scheduleDesc)
            
        }

    return (
    <div className="align-items-center justify-content-between">
        <li key={index} className="d-flex flex-row" >
            <input type="text" className="form-control" value={scheduleDesc} readOnly={!isEditable} ref={inputRef}
            onChange={(e) => setScheduleDesc(e.target.value)}></input>
                {isEditable ? 
                    <button className="btn mx-2 my-2 btn-primary" onClick={handleSave}>Save</button> :
                    <button className="btn mx-2 my-2 btn-success" onClick={handleEdit}>Update</button>
                }
                <button className="btn btn-danger mx-2 my-2" onClick={() =>
                    APISchedule.deleteScedule(scheduleId,id).then(() => navigate(0))
                
                }>X</button>
        </li>
    </div>)
    }
    export default ScheduleList