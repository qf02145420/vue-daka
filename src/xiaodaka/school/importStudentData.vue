<template>
  <div>
    <el-row class="div-file">
      <import-excel :on-success="handleSuccess" :before-upload="beforeUpload" />
      <div>
        <el-alert
          title="上传的学生数据必须保有“studentNO”和“studentName”两列，您可以在已有表格上加入这两个表头名称，也可以点击“下载模板”，使用我们提供的模板填入必要的数据。"
          :closable="false"
        >
        </el-alert>
        <div style="float: right; margin: 10px;">
          <el-button type="primary" @click="handleDownLoad">下载模板</el-button>
          <el-button type="primary" @click="handleSave">保存数据</el-button>
        </div>
      </div>
    </el-row>
    <el-table :data="tableData">
      <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
    </el-table>
    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="tableData"
      :element-loading-text="elementLoadingText"
      @selection-change="setSelectRows"
      @sort-change="tableSortChange"
    >
      <el-table-column label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
      <el-table-column label="操作" width="180px" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)">编辑 </el-button>
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
    <edit ref="edit"></edit>
  </div>
</template>

<script>
import ImportExcel from "@/xiaodaka/myComponents/importExcel";

export default {
  name: "ImportStudentData",
  components: { ImportExcel },
  data() {
    return {
      tableData: [],
      tableHeader: [],
      classData: null,
      imgShow: true,
      listLoading: true,
      layout: "total, sizes, prev, pager, next, jumper",
      total: 0,
      background: true,
      selectRows: "",
      elementLoadingText: "正在加载...",
      queryForm: {
        pageNo: 1,
        pageSize: 20,
        title: "",
      },
    };
  },
  mounted() {
    this.classData = this.$route.query;
    console.log(JSON.stringify(this.classData));
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (isLt1M) {
        return true;
      }

      this.$message({
        message: "请上传不大于1MB的文件。",
        type: "warning",
      });
      return false;
    },
    handleSuccess({ results, header }) {
      this.tableData = results;
      this.tableHeader = header;
    },
    handleDownLoad() {
      this.downloadLoading = true;
      import("@/vendor/ExportExcel").then((excel) => {
        const tHeader = ["学号", "学生姓名"];
        const data = [
          ["studentNO", "studentName"],
          ["123456", "小明"],
          ["123457", "小红"],
        ];
        // const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "学生列表模板",
          autoWidth: true,
          bookType: "xlsx",
        });
        this.downloadLoading = false;
      });
    },
    // formatJson(filterVal, jsonData) {
    //   return jsonData.map((v) =>
    //     filterVal.map((j) => {
    //       return v[j];
    //     })
    //   );
    // },
    handleSave() {
      //
    },
  },
};
</script>
<style scoped>
.div-file {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
</style>
