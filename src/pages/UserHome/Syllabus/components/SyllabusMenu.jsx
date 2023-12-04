import { Add, AddCircle, Remove, RemoveCircle } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const SyllabusMenu = ({ SyllabusObj }) => {
  const [currTopic, setCurrTopic] = useState(0);

  const [topics, setTopics] = useState(SyllabusObj.topicsArr);

  // Add a new topic after clicking on (+)
  const addtopic = () => {
    let obj = {
      name: "",
      description: "",
      time: "",
      subtopics: [
        {
          name: "",
          description: "",
        },
      ],
    };
    setTopics([...topics, obj]);
    SyllabusObj.topicsArr = [...topics];
    // console.log(topics);
  };

  // Add a subtopic
  const addSubtopic = () => {
    let obj = {
      name: "",
      decription: "",
    };
    let arr = [...topics];
    arr[currTopic].subtopics.push(obj);
    // console.log(arr);
    setTopics(arr);
    SyllabusObj.topicsArr = [...topics];
  };

  // Rerender the component when syllabus data fetched from database
  useEffect(() => {
    setTopics(SyllabusObj.topicsArr);
  }, [SyllabusObj.id]);

  return (
    <Paper
      sx={{
        display: "flex",
        width: 1,
        alignItems: "flex-start",
        border: "2px solid",
        borderColor: "primary.main",
        borderRadius: "5px",
      }}
      elevation={1}
    >
      <Box
        sx={{
          width: {
            xs: 0.5,
            md: 0.3,
            lg: 0.25,
          },
        }}
      >
        {/* Topics List */}
        <List sx={{ width: 1, m: 0, p: 0 }}>
          {topics.map((item, index) => {
            return (
              <ListItem
                disablePadding
                key={index}
                sx={{ bgcolor: currTopic == index ? "primary.main" : "" }}
              >
                <ListItemButton
                  onClick={() => setCurrTopic(index)}
                  sx={{
                    display: "flex",
                    flexDirection: {
                      xs: "column-reverse",
                      md: "row",
                    },
                  }}
                >
                  <RemoveCircle
                    sx={{
                      mr: {
                        xs: 0,
                        md: 1,
                      },
                    }}
                    onClick={() => {
                      topics.splice(index, 1);
                      setTopics(topics);
                      SyllabusObj.topicsArr = [...topics];
                    }}
                  />
                  <TextField
                    size="small"
                    defaultValue={item.name}
                    label="Topic"
                    sx={{
                      width: {
                        xs: 1,
                        md: 0.6,
                      },
                    }}
                    onChange={(e) => {
                      item.name = e.target.value;
                      setTopics(topics);
                      SyllabusObj.topicsArr = [...topics];
                    }}
                    key={item.name + index + 76}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        {/* Add topic button */}
        <Box
          sx={{
            display: "flex",
            width: 1,
            justifyContent: "center",
            pt: 2,
          }}
        >
          <AddCircle onClick={addtopic} />
        </Box>
      </Box>

      {/* Vertical Divider */}
      <Divider
        orientation="vertical"
        flexItem
        sx={{ bgcolor: "primary.main" }}
      />

      {/* Title, Desc and subtopic box */}
      <Box key={currTopic} sx={{ width: 0.5, p: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            gap: 2,
          }}
        >
          {/* Topic Description field */}
          <TextField
            size="small"
            label="Description"
            defaultValue={topics[currTopic] && topics[currTopic].description}
            onChange={(e) => {
              topics[currTopic].description = e.target.value;
              setTopics(topics);
              SyllabusObj.topicsArr = [...topics];
            }}
            key={topics[currTopic] && topics[currTopic].description}
          />
          {/* Alloted time field */}
          <TextField
            size="small"
            label="Alloted time"
            defaultValue={topics[currTopic] && topics[currTopic].time}
            onChange={(e) => {
              topics[currTopic].time = e.target.value;
              setTopics(topics);
              SyllabusObj.topicsArr = [...topics];
            }}
            key={topics[currTopic] && topics[currTopic].time}
          />
        </Box>
        {/* Subtopics List */}
        <Box>
          <Typography sx={{ m: 2 }}>Sub Topics</Typography>
          <Box>
            {topics[currTopic] &&
              topics[currTopic].subtopics.map((item, index) => {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: {
                        xs: "column",
                        md: "row",
                      },
                      gap: 2,
                      mt: 2,
                      alignItems: "center",
                    }}
                    key={index}
                  >
                    <TextField
                      size="small"
                      label="Title"
                      defaultValue={item.name}
                      onChange={(e) => {
                        item.name = e.target.value;
                        setTopics(topics);
                        SyllabusObj.topicsArr = [...topics];
                      }}
                      key={item.name + index}
                    />
                    <TextField
                      size="small"
                      label="Description"
                      defaultValue={item.description}
                      onChange={(e) => {
                        item.description = e.target.value;
                        setTopics(topics);
                        SyllabusObj.topicsArr = [...topics];
                      }}
                      key={item.decription + index + 88}
                    />
                    <RemoveCircle
                      onClick={() => {
                        let arr = [...topics];
                        arr[currTopic].subtopics.splice(index, 1);
                        setTopics(arr);
                        SyllabusObj.topicsArr = [...topics];
                      }}
                    />
                  </Box>
                );
              })}
          </Box>
          {/* Add Subtopic Button */}
          <Box
            sx={{
              display: "flex",
              width: 1,
              justifyContent: "flex-end",
              pt: 2,
            }}
            onClick={addSubtopic}
          >
            <AddCircle />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default SyllabusMenu;
