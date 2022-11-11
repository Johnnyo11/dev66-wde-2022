<template>
  <div style="display: flex; width: 100%; height: 320px; flex-direction: column; align-items: center; justify-content: center;">
    <div>
      <el-button @click="scan" type="primary" style="width: 148px; height: 80px; font-size: 24px;">Scan</el-button>
    </div>
    <div style="margin-top: 40px;">
      <el-button @click="scan2" type="success" style="width: 148px; height: 80px; font-size: 24px;">Info</el-button>
    </div>
    <el-dialog title="Scanning QRCode" :visible.sync="choosing">
        <el-select
          style="width: 100%;"
          v-model="agentId"
          filterable
          remote
          placeholder="Please select an agent"
          :remote-method="remoteMethod"
          :loading="agentLoading"
          >
          <el-option
            v-for="item in options"
            :key="item._id"
            :label="item.billNo + ' | ' + item.name + ' | ' + item.tel"
            :value="item._id">
          </el-option>
        </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="choosing = false">Cancel</el-button>
        <el-button type="primary" :disabled="agentId===''" @click="()=>prepareScan()">Continue</el-button>
      </span>
    </el-dialog>
    <el-dialog title="Scanning QRCode" :visible.sync="scanning">
      <span style="display: flex; align-items: center; justify-content: center; margin-bottom: 4px;">{{options.find((v)=>v._id === agentId) ? options.find((v)=>v._id === agentId).name : ''}}</span>
      <span style="display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">Scan a packing list</span>
      <StreamBarcodeReader
        v-if="scanning"
        class="qrcodeReader"
        @decode="onDecode">
      </StreamBarcodeReader>
      <span slot="footer" class="dialog-footer">
        <el-button @click="()=>{
          scanning = false
          if (idList.length > 0) {
            finishing = true
          }
        }">Cancel</el-button>
      </span>
    </el-dialog>
    <el-dialog title="Finish" :visible.sync="finishing">
      <span style="word-break: break-word;">Packing lists scanned:</span>
      <ul style="display: flex; flex-direction: column; justify-content: center; align-items: flex-start;">
        <li v-for="(item, index) in idList" :key="index" style="word-break: break-word; margin-bottom: 8px;">
          PL/{{item.billNo}}
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="()=>{
              idList.splice(index, 1)
            }"></el-button>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="()=>{
          finishing = false
          idList = []
        }">Cancel</el-button>
        <el-button type="primary" @click="()=>{
          finishing = false
          scanning = true
        }">Scan</el-button>
        <el-button type="success" @click="()=>finish()">Finish</el-button>
      </span>
    </el-dialog>
    <el-dialog title="Success" :visible.sync="success">
      <span style="word-break: break-word;">Congratulations! The packing lists has been assigned:</span>
      <span style="display: flex; word-break: break-word;">Success:</span>
      <ul style="display: flex; flex-direction: column; justify-content: center; align-items: flex-start;">
        <li v-for="(item, index) in successMessages" :key="index" style="word-break: break-word; margin-bottom: 8px; color: #67C23A;">
          PL/{{item.message}}
        </li>
      </ul>
      <span style="display: flex; word-break: break-word;">Errors:</span>
      <ul style="display: flex; flex-direction: column; justify-content: center; align-items: flex-start;">
        <li v-for="(item, index) in errorMessages" :key="index" style="word-break: break-word; margin-bottom: 8px; color: #F56C6C;">
          PL/{{item.message}}
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="success = false">Cancel</el-button>
      </span>
    </el-dialog>
    <el-dialog title="Failure" :visible.sync="error">
      <span style="word-break: break-word;">We are sorry to inform you that an error has occured: {{errorMessage}}.</span>
      <span style="word-break: break-word;">Please try again.</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="error = false">Cancel</el-button>
      </span>
    </el-dialog>
    <el-dialog title="Scanning QRCode" :visible.sync="scanning2">
      <span style="display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">Scan a packing list for more info</span>
      <StreamBarcodeReader
        v-if="scanning2"
        class="qrcodeReader"
        @decode="onDecode2">
      </StreamBarcodeReader>
      <span slot="footer" class="dialog-footer">
        <el-button @click="()=>{
          scanning2 = false
        }">Cancel</el-button>
      </span>
    </el-dialog>
    <el-dialog title="Success" :visible.sync="success2">
      <span style="display: flex; word-break: break-word;">Sticker No: PL/{{successMessage.billNo}}</span>
      <span style="display: flex; word-break: break-word;">Completed At: {{successMessage.createdAt | formatDateTime}}</span>
      <span style="display: flex; word-break: break-word;">Scan Status: {{successMessage.status}}</span>
      <span style="display: flex; word-break: break-word;">Items:</span>
      <el-table
        :default-sort = "{prop: 'createdAt', order: 'descending'}"
        :data="successMessage.items" element-loading-text="Loading" fit highlight-current-row>
        <el-table-column
          label="#"
          width="50" type="index" :index="indexMethod">
        </el-table-column>
        <el-table-column
          prop="code"
          label="Code"
          width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          label="Description"
          width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="quantity"
          label="Color"
          width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.color }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="size"
          label="Size"
          width="60">
          <template slot-scope="scope">
            <span>{{ scope.row.size === "Others" ? scope.row.sizeOthers : scope.row.size }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="uom"
          label="UOM"
          width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.uom }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="quantity"
          label="Quantity">
          <template slot-scope="scope">
            <span>{{ scope.row.amount }}</span>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="success2 = false">Cancel</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// import { countTomatoes } from '@/api/tomato'
import { findAgents } from '@/api/agent'
import { boxPackingList } from '@/api/packinglists'
import { createDeliveryAgent } from '@/api/deliveryagents'
import { StreamBarcodeReader } from "vue-barcode-reader";
import moment from 'moment'

export default {
  name: 'dashboard',
  data() {
    return {
      agentLoading: false,
      scanning: false,
      scanning2: false,
      choosing: false,
      success: false,
      success2: false,
      finishing: false,
      error: false,
      successMessages: [],
      successMessage: {},
      errorMessages: [],
      errorMessage: '',
      agentId: '',
      options: [],
      idList: []
    }
  },
  filters: {
    formatDateTime(val) {
      return moment(val).format('DD/MM/YYYY HH:mm')
    }
  },
  methods: {
    async scan() {
      this.choosing = true
      this.agentLoading = true
      const resp = await findAgents()
      this.options = resp.data
      this.agentLoading = false
    },
    async scan2() {
      this.scanning2 = true
    },
    async remoteMethod(query) {
      if (query !== '') {
        this.agentLoading = true
        const resp = await findAgents(query)
        this.options = resp.data
        this.agentLoading = false
      } else {
        this.agentLoading = true
        const resp = await findAgents()
        this.options = resp.data
        this.agentLoading = false
      }
    },
    async onDecode(json) {
      this.idList.push(JSON.parse(json))
      this.scanning = false
      this.finishing = true
    },
    async onDecode2(json) {
      const json2 = JSON.parse(json)
      if (json2._id) {
        this.successMessage = await boxPackingList(json2._id)
        this.scanning2 = false
        this.success2 = true
      } else {
        this.errorMessage = 'Invalid QRCode format.'
        this.error = true
      }
    },
    async finish() {
      this.finishing = false
      this.choosing = false
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      try {
        const resp = await createDeliveryAgent({
          agentId: this.agentId,
          packingListId: this.idList
        })
        this.$router.push({ name: 'deliveryagent' })
        this.successMessages = resp.successMessages
        this.errorMessages = resp.errorMessages
        this.success = true
        this.idList = []
        loading.close()
      } catch (err) {
        this.errorMessage = err.response.data.error
        this.error = true
        this.idList = []
        loading.close()
      }
    },
    prepareScan() {
      if (this.agentId) {
        this.scanning = true
      }
    }
  },
  async mounted() {
    // this.tomatoAmount = await countTomatoes()
  },
  computed: {
    awakRole() {
      return this.$store.state.user.awakRole
    }
  },
  components: {
    StreamBarcodeReader
  }
}
</script>
<style lang="scss">
@import 'src/styles/variables.scss';
.el-date-editor .el-range-separator {
  width: 20px;
}
.rowCursor {
  cursor: pointer;
}
.selectBackground {
  .el-input__inner {
    background-color: #eee;
  }
}
.dashboardSection {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 520px) {
    flex-direction: column;
  }
  .dashboardBox {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 240px;
    height: 160px;
    border: 1px #999 solid;
    margin: 10px 20px;
    border-radius: 20px;
    .dashboardBoxTop {
      margin-bottom: 20px;
      font-size: 21px;
      font-weight: bold;
    }
    .dashboardBoxBottom {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      height: 20px;
    }
    .dashboardStatus {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      // border: #ccc 1px solid;
      // border-radius: 10px;
      padding: 6px;
      margin-bottom: 4px;
      width: 100px;
      height: 20px;
      font-size: 13px;
    }
    .dashboardNumber {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 6px;
      margin-bottom: 4px;
      width: 40px;
      height: 20px;
      font-size: 13px;
    }
  }
}
.qrcodeReader {
  display: flex;
  // justify-content: center;
  // align-items: center;
  background-color: #000;
  // width: 100%;
  // height: 240px;
}
.el-dialog {
  margin-top: 15vh;
  margin-bottom: 15vh;
  @media screen and (max-width: 768px) {
    width: 90%;
  }
}
</style>