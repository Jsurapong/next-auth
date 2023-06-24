"use client";

import React from "react";
import { Table, Card, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { json2csv } from "json-2-csv";

import { useGetRoomByIdQuery } from "@/app/room/service";
import { useGetUserQuery } from "@/app/user/service";
import { useGetCheckRoomQuery } from "@/app/check-list/service";
import dayjs from "dayjs";

import { StatusOption } from "@/components/CheckList/constants";
import { yearOption } from "../Room/constants";

type DataType = {
  index?: number;
  id?: number;
  name?: string;
  check_1?: string;
  check_2?: string;
  check_3?: string;
  check_4?: string;
  summary?: string;
};

const UserTable: React.FC<{
  roomId: number;
  year: number;
  term: number;
}> = ({ roomId, term, year }) => {
  console.log({ roomId, term, year });

  const { data, isFetching } = useGetCheckRoomQuery(
    { roomId },
    { skip: !roomId }
  );

  const { data: user } = useGetUserQuery({});
  const { data: room } = useGetRoomByIdQuery(roomId, { skip: !roomId });

  const getCheck = (userId: number, time: 1 | 2 | 3 | 4) => {
    const checkTerm = data?.find(
      (item) => item.year === year && item.term === term && item.time === time
    );

    const checkUser = checkTerm?.checkStudent?.find(
      (item) => item.user.id === userId
    );

    return checkUser?.isPass;
  };

  const format = (isPass?: boolean) =>
    StatusOption?.find((item) => item.value === isPass)?.label ?? "";

  const data2 = user
    ?.filter((item) => item.roomId === roomId)
    ?.map((item, index) => {
      const check_1 = getCheck(item.id, 1);
      const check_2 = getCheck(item.id, 2);
      const check_3 = getCheck(item.id, 3);
      const check_4 = getCheck(item.id, 4);

      const summary = !!(check_1 && check_2 && check_3 && check_4);

      return {
        index: index + 1,
        id: item.id,
        name: item.f_name + " " + item.l_name,
        check_1: format(check_1),
        check_2: format(check_2),
        check_3: format(check_3),
        check_4: format(check_4),
        summary: format(summary),
      };
    });

  const exportCSV = () => {
    json2csv(data2 ?? []).then((csv) => {
      const newCSV = csv
        ?.replace(/index/g, "ที่")
        ?.replace(/id/g, "รหัสประจำตัว")
        ?.replace(/name/g, "ชื่อ - สกุล")
        ?.replace(/check_/g, "ครั้งที่ ")
        ?.replace(/summary/g, "ประเมินผล");

      const title =
        "ตรวจเครื่องแบบ เครื่องแต่งกาย ทรงผม ตามระเบียบของสถานศึกษา";

      const subTitle = `ประจำภาคเรียนที่  ${term}/${dayjs().format(
        "YYYY"
      )}  วิทยาลัยการอาชีพบรรพตพิสัย`;

      const yearText = yearOption?.find(
        (item) => item.value === room?.year
      )?.label;

      let teacher = user?.find((item) => item.id === room?.teacherId);
      const teacherName = (
        (teacher?.f_name ?? "") +
        " " +
        (teacher?.l_name ?? "")
      ).trim();

      const description = `แผนกวิชา ${
        room?.department?.name ?? "-"
      } ระดับชั้น ${yearText ?? "-"}  ครูที่ปรึกษา ${teacherName ?? "-"}`;

      downloadCSVFile(`${title}\n${subTitle}\n${description}\n` + newCSV);
    });
  };

  return (
    <Card
      title="เช็คชื่อรายห้อง"
      extra={
        <>
          <Button
            onClick={() => {
              exportCSV();
            }}
          >
            Export
          </Button>
        </>
      }
    >
      <Table
        loading={isFetching}
        columns={makeColumns()}
        rowKey={"id"}
        dataSource={data2}
      />
    </Card>
  );
};

export default UserTable;

function makeColumns(): ColumnsType<DataType> {
  return [
    {
      title: "ที่",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "รหัสประจำตัว",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "ชื่อ - สกุล",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "ครั้งที่ 1",
      dataIndex: "check_1",
      key: "check_1",
    },
    {
      title: "ครั้งที่ 2",
      dataIndex: "check_2",
      key: "check_2",
    },
    {
      title: "ครั้งที่ 3",
      dataIndex: "check_3",
      key: "check_3",
    },
    {
      title: "ครั้งที่ 4",
      dataIndex: "check_4",
      key: "check_4",
    },
    {
      title: "ประเมินผล",
      dataIndex: "summary",
      key: "summary",
    },
  ];
}

function downloadCSVFile(csv_data: string) {
  // Create CSV file object and feed our
  // csv_data into it

  const CSVFile = new Blob([csv_data], { type: "text/csv" });

  // Create to temporary link to initiate
  // download process
  const temp_link = document.createElement("a");

  // Download csv file
  temp_link.download = "แบบฟอร์มตรวจร่างกาย.csv";
  const url = window.URL.createObjectURL(CSVFile);
  temp_link.href = url;

  // This link should not be displayed
  temp_link.style.display = "none";
  document.body.appendChild(temp_link);

  // Automatically click the link to trigger download
  temp_link.click();
  document.body.removeChild(temp_link);
}
