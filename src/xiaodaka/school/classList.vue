<template>
  <div class="notice">
    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      @selection-change="setSelectRows"
      @sort-change="tableSortChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="班级名称" prop="title"></el-table-column>
      <el-table-column label="学生人数" prop="studentCount"></el-table-column>
      <el-table-column label="创建时间" prop="createdTime" width="200"></el-table-column>
      <el-table-column label="操作" width="200px" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="handleShow(scope.row)">查看 </el-button>
          <el-button type="text" @click="handleImport(scope.row)">导入学生 </el-button>
          <!-- <import-excel :on-success="handleSuccess" :before-upload="beforeUpload" /> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :background="background"
      :current-page="queryForm.pageNo"
      :layout="layout"
      :page-size="queryForm.pageSize"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
  </div>
</template>

<script>
import { getList, doDelete } from "@/api/table";
import { getUserInfo } from "@/xiaodaka/data/userInfo";
import { createFindData } from "@/utils";
import { getClassByOpenId } from "@/xiaodaka/api/school";
export default {
  name: "ClassList",
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      imgShow: true,
      list: [],
      listLoading: true,
      layout: "total, sizes, prev, pager, next, jumper",
      total: 0,
      background: true,
      selectRows: "",
      elementLoadingText: "正在加载...",
      queryForm: {
        pageNo: 1,
        pageSize: 5,
        title: "",
      },
    };
  },
  created() {
    this.fetchData();
  },
  beforeDestroy() {},
  mounted() {},
  methods: {
    tableSortChange() {},
    setSelectRows(val) {
      this.selectRows = val;
    },
    handleShow(row) {
      //
      //this.$refs["edit"].showEdit(row);
    },
    handleImport(row) {
      this.$router.push({ path: "/importData/importData", query: row });
    },
    handleSizeChange(val) {
      this.queryForm.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.queryForm.pageNo = val;
      this.fetchData();
    },
    handleQuery() {
      this.queryForm.pageNo = 1;
      this.fetchData();
    },
    fetchData1() {
      var userInfo = getUserInfo();
      if (userInfo.openId) {
        var postData = createFindData();
        postData.query = { relation: { $in: [userInfo.openId] } };
        getClassByOpenId(postData).then((response) => {
          total = response.result.count;
          this.list = [];
          response.result.results.forEach((e) => {
            if (!e.studentCount) {
              e.studentCount = "";
            }
            this.list.push(e);
          });
        });
      }
    },

    fetchData() {
      this.listLoading = true;
      getList(this.queryForm).then((res) => {
        this.list = res.data;
        this.total = res.totalCount;
        setTimeout(() => {
          this.listLoading = false;
        }, 500);
      });
    },
    testMessage() {
      this.$baseMessage("test1", "success");
    },
    testALert() {
      this.$baseAlert("11");
      this.$baseAlert("11", "自定义标题", () => {
        /* 可以写回调; */
      });
      this.$baseAlert("11", null, () => {
        /* 可以写回调; */
      });
    },
    testConfirm() {
      this.$baseConfirm(
        "你确定要执行该操作?",
        null,
        () => {
          /* 可以写回调; */
        },
        () => {
          /* 可以写回调; */
        }
      );
    },
    testNotify() {
      this.$baseNotify("测试消息提示", "test", "success", "bottom-right");
    },

    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (isLt1M) {
        return true;
      }

      this.$message({
        message: "Please do not upload files larger than 1m in size.",
        type: "warning",
      });
      return false;
    },
    handleSuccess({ results, header }) {
      this.tableData = results;
      this.tableHeader = header;
    },
  },
};
</script>
