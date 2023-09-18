import { v4 as uuidv4 } from 'uuid';
import moment from "moment";

// Sample data for the new Tasks with labels
const tempLabels = [
  {
    key: uuidv4(),
    title: "Plan a Trip",
    color: "#5CD859",
    category: "",
    tasks: [
      {
        key: uuidv4(),
        name: "Book a train ticket",
        date: moment(new Date()).format('DD.MM.YYYY HH:mm'),
        checked: false,
        reminder: true,
        reminderDate: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
      },
      {
        key: uuidv4(),
        name: "Passport check",
        date: moment(new Date()).format('DD.MM.YYYY HH:mm'),
        checked: false,
      },
      {
        key: uuidv4(),
        name: "Water",
        date: moment(new Date()).format('DD.MM.YYYY HH:mm'),
        checked: false,
      },
    ],
  },
  {
    key: uuidv4(),
    title: "Life Hacks",
    color: "#D85963",
    category: "",
    tasks: [
      {
        key: uuidv4(),
        name: "Book a train ticket",
        date: moment(new Date()).format('DD.MM.YYYY HH:mm'),
        checked: false,
      },
      {
        key: uuidv4(),
        name: "test2",
        date: moment(new Date()).format('DD.MM.YYYY HH:mm'),
        checked: false,
      },
      {
        key: uuidv4(),
        name: "test3",
        date: moment(new Date()).format('DD.MM.YYYY HH:mm'),
        checked: false,
      },
      {
        key: uuidv4(),
        name: "Passport check",
        date: moment(new Date()).format('DD.MM.YYYY HH:mm'),
        checked: true,
      },
    ],
  },
  {
    key: uuidv4(),
    title: "Personal",
    color: "#D159D8",
    category: "",
    tasks: [
      {
        key: uuidv4(),
        name: "Book a train ticket",
        date: moment(new Date()).format('DD.MM.YYYY HH:mm'),
        checked: true,
      },
      {
        key: uuidv4(),
        name: "Passport check",
        date: moment(new Date()).format('DD.MM.YYYY HH:mm'),
        checked: false,
      },
      {
        key: uuidv4(),
        name: "2 Passport check",
        date: moment(new Date()).format('DD.MM.YYYY HH:mm'),
        checked: true,
      },
    ],
  },
  {
    key: uuidv4(),
    title: "Other",
    color: "#8022D9",
    category: "",
    tasks: [
      {
        key: uuidv4(),
        name: "Some todo",
        date: moment(new Date()).format('DD.MM.YYYY HH:mm'),
        checked: false,
      },
      {
        key: uuidv4(),
        name: "test1",
        date: moment(new Date()).format('DD.MM.YYYY HH:mm'),
        checked: false,
      },
      {
        key: uuidv4(),
        name: "test2",
        date: moment(new Date()).format('DD.MM.YYYY HH:mm'),
        checked: false,
      },
      {
        key: uuidv4(),
        name: "test3",
        date: moment(new Date()).format('DD.MM.YYYY HH:mm'),
        checked: false,
      },
      {
        key: uuidv4(),
        name: "Something else",
        date: moment(new Date()).format('DD.MM.YYYY HH:mm'),
        checked: true,
      },
    ],
  },
  {
    key: uuidv4(),
    title: "Passwords",
    color: "#595BD9",
    category: "",
    tasks: [
      {
        key: uuidv4(),
        name: "password1",
        date: moment(new Date()).format('DD.MM.YYYY HH:mm'),
        checked: true,
      },
      {
        key: uuidv4(),
        name: "Password2",
        date: moment(new Date()).format('DD.MM.YYYY HH:mm'),
        checked: false,
      },
      {
        key: uuidv4(),
        name: "Password3",
        date: moment(new Date()).format('DD.MM.YYYY HH:mm'),
        checked: false,
      },
    ],
  },
  {
    key: uuidv4(),
    title: "Car",
    color: "#5CD859",
    category: "",
    tasks: [
      {
        key: uuidv4(),
        name: "wash",
        date: moment(new Date()).format('DD.MM.YYYY HH:mm'),
        checked: true,
      },
      {
        key: uuidv4(),
        name: "repair",
        date: moment(new Date()).format('DD.MM.YYYY HH:mm'),
        checked: true,
      },
      {
        key: uuidv4(),
        name: "change tires",
        date: moment(new Date()).format('DD.MM.YYYY HH:mm'),
        checked: true,
      },
    ],
  },
  {
    key: uuidv4(),
    title: "Work",
    color: "#24A6D9",
    category: "",
    tasks: [
      {
        key: uuidv4(),
        name: "test app",
        date: moment(new Date()).format('DD.MM.YYYY HH:mm'),
        checked: false,
      },
      {
        key: uuidv4(),
        name: "change themes",
        date: moment(new Date()).format('DD.MM.YYYY HH:mm'),
        checked: false,
      },
    ],
  },
];

export default tempLabels;