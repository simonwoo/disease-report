import React, { Component } from 'react';

import IntervalTitle from './components/IntervalTitle';
import Tag from './components/Tag';
import List from './components/List';

import {Row, Col, Button} from 'antd';
import dayjs from 'dayjs';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import styles from './App.module.less';

const list = [
  { value: 1.8, color: '#8b0030', content: '骨骼组织、牙齿本质' },
  { value: 2.6, color: '#ee1d23', content: '紧实的结缔组织、关节、心瓣膜、椎间盘、软骨、皮肤、红血球' },
  { value: '2.6-3.4', color: '#ff0100', content: '弹性的结缔组织、骨骼肌、心肌' },
  { value: 3.4, color: '#ffff00', content: '平滑肌4.2-6.6 上皮组织' },
  { value: 4.2, color: '#91234a', content: '消化道单皮上皮组织' },
  { value: 4.9, color: '#009900', content: '多层上皮组织、肝脏间质组织、消化道周边器官如胰脏' },
  { value: '4.9-5.8', color: '#4f81bd', content: '肾脏组织、膀胱、生殖器官的上皮组织、血球细胞' },
  { value: 5.8, color: '#30959c', content: '喉部淋巴环、上呼吸道、淋巴系统、脾脏、卵巢、前列腺、乳腺、子宫' },
  { value: 6.6, color: '#ff0066', content: '周边神经系统、支气管上皮、气管、支气管、肾上腺、甲状腺、各管腔' },
  { value: 7.4, color: '#d17981', content: '大脑感官区、下视丘、脑干、脑灰质、桥脑、松果体、小脑、脊髓' },
  { value: 8.2, color: '#000000', content: '视网膜、视神经、脑白质' },
]

const { userBasicInfo, recommendFood, notRecommendFood, allergen } = window.globalData
class App extends Component {
  download = ()   => {
    html2canvas(this.refs.pdf, {scale: 2}).then(canvas => {
      //返回图片dataURL，参数：图片格式和清晰度(0-1)
      let pageData = canvas.toDataURL('image/jpeg', 1.0);
      
      let dims = {
        a2: [1190.55, 1683.78],
        a3: [841.89, 1190.55],
        a4: [595.28, 841.89]
      }
      //方向默认竖直，尺寸ponits，格式a2
      let pdf = new jsPDF('', 'pt', 'a4');

      let a4Width = dims['a4'][0];
      let a4Height = dims['a4'][1];
      
      let contentWidth = canvas.width,
        contentHeight = canvas.height;
      
      let pageHeight = contentWidth/a4Width * a4Height;
      let leftHeight = contentHeight;
      let position = 0;
      let imgWidth = a4Width,
        imgHeight = a4Width/contentWidth * contentHeight;
      
      if(leftHeight < pageHeight) {
        //addImage后两个参数控制添加图片的尺寸，此处将页面高度按照a4纸宽高比列进行压缩
        pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
      } else {
        while(leftHeight > 0) {
          pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight );
          leftHeight -= pageHeight;
          position -= a4Height;

          if(leftHeight > 0) {
            pdf.addPage();
          }
        }
      }

      pdf.save('test.pdf');
    });
  }

  render() {
    return (
      <div>
        <div className={styles.top}>
          <Button type="primary" onClick={this.download}>下载</Button>
        </div>

        <div className={styles.App} ref="pdf">
        {/* 个人信息页 */}
          <div className={styles.page1} style={{textAlign: 'center'}}>
            <div style={{display: 'inline-block'}}>
              <img src="image/picture3.png" alt="" style={{width: 260}}/>
              <div style={{fontSize: 50, color: 'red'}}><span>XX体检中心体检报告</span></div>
              <div style={{fontSize: 30, color: '#000000', textAlign: 'left'}}>
                <div style={{marginLeft: 140, marginBottom: 10}}><span>姓名：</span><span style={{textDecoration: 'underline'}}>{userBasicInfo.name}</span></div>
                <div style={{marginLeft: 140, marginBottom: 10}}><span>日期：</span><span style={{textDecoration: 'underline'}}>{userBasicInfo.examineDate}</span></div>
                <div style={{marginLeft: 140, marginBottom: 10}}>
                  <span>出生：</span>
                  <span style={{textDecoration: 'underline'}}>{dayjs(userBasicInfo.birthday).format('YYYY')}</span><span>年</span>
                  <span style={{textDecoration: 'underline'}}>{dayjs(userBasicInfo.birthday).format('MM')}</span><span>月</span>
                  <span style={{textDecoration: 'underline'}}>{dayjs(userBasicInfo.birthday).format('DD')}</span><span>日</span>
                </div>
                <div style={{marginLeft: 140, marginBottom: 10}}><span>性别：</span><span style={{textDecoration: 'underline'}}>{userBasicInfo.gender}</span></div>
                <div style={{marginLeft: 140, marginBottom: 10}}><span>手机号：</span><span style={{textDecoration: 'underline'}}>{userBasicInfo.phone}</span></div>
                <div style={{marginLeft: 140, marginBottom: 10}}><span>微信号：</span><span style={{textDecoration: 'underline'}}>{userBasicInfo.wechatNum}</span></div>
                <div style={{marginLeft: 140, marginBottom: 10}}><span>血型：</span><span style={{textDecoration: 'underline'}}>{userBasicInfo.bloodGroup}</span></div>            
                <div style={{marginLeft: 140, marginBottom: 10}}><span>身高：</span><span style={{textDecoration: 'underline'}}>{userBasicInfo.height + 'CM'}</span></div>
                <div style={{marginLeft: 140, marginBottom: 10}}><span>体重：</span><span style={{textDecoration: 'underline'}}>{userBasicInfo.weight + 'KG'}</span></div>
                <div style={{marginLeft: 140, marginBottom: 10}}><span>家族病史：</span><span style={{textDecoration: 'underline'}}>{userBasicInfo.familyDiseaseHistory}</span></div>
                <div style={{marginLeft: 140, marginBottom: 10}}><span>职业(细化工种)：</span><span style={{textDecoration: 'underline'}}>{userBasicInfo.occupation}</span></div>
                <div style={{marginLeft: 140, marginBottom: 10}}><span>地域市区：</span><span style={{textDecoration: 'underline'}}>{userBasicInfo.address}</span></div>
              </div>
            </div>
          </div>

          {/* 膳食建议 */}
          <div className={styles.page2}>
            <Row>
              <Col><IntervalTitle title="膳食建议"/></Col>
              <Col span={12} style={{textAlign: 'center'}}>
                <div style={{display: 'inline-block', width: 300}}>
                  <div style={{paddingLeft: 50}}><Tag text="建议避免食用食物"></Tag></div>
                    <p style={{fontSize: 24, textAlign: 'center', margin: 0}}>{notRecommendFood.map(item => item.name).join('、') || '无'}</p>
                </div>
              </Col>
              <Col span={12} style={{textAlign: 'center'}}>
                <div style={{display: 'inline-block', width: 300, color: '#0eb154'}}>
                  <div style={{paddingLeft: 50}}><Tag text="适量多摄取食物"></Tag></div>
                    <p style={{fontSize: 24, textAlign: 'center', margin: 0}}>{recommendFood.map(item => item.name).join('、') || '无'}</p>
                </div>
              </Col>
            </Row>

            <Row>
              <Col><IntervalTitle title="过敏源"/></Col>
              <Col span={12} style={{textAlign: 'center'}}>
                <div style={{display: 'inline-block', width: 300}}>
                  <div style={{paddingLeft: 50}}><Tag text="过敏源"></Tag></div>
                    <p style={{fontSize: 24, textAlign: 'center', margin: 0}}>{allergen.map(item => item.name).join('、') || '无'}</p>
                </div>
              </Col>
            </Row>
          </div>

          {/* B超原理 */}
          <div className={styles.page2}>
            <Row>
              <IntervalTitle title="B超原理"/>
              <img src="/image/picture2.png" alt="" style={{width: '80%'}}/>
              <p style={{fontSize: 22, margin: '20px 0', textIndent: '2em', textAlign: 'left'}}>每秒振动2万-10亿次，人耳听不到的声波称为超声波。利用超声波的物理特性进行诊断和治疗的一门影像学科，称为超声医学。其临床应用范围广泛，目前已成为现代临床医学中不可缺少的诊断方法。研究和应用超声的物理特性，以某种方式扫查人体，诊断疾病的科学称为超声诊断学。超声诊断学主要是研究人体对超声的反作用规律，以了解人体内部情况，在现代医学影像学中与CT、X线、核医学、磁共振并驾齐驱，互为补充。它以强度低、频率高、对人体无损伤、无痛苦、显示方法多样而著称，尤其对人体软组织的探测和心血管脏器的血流动力学观察有其独到之处。超声诊断学包括作用原理、仪器构造、显示方法、操作技术、记录方法、以及界面对超声的反射、散射或者透射信号的分析与判断等内容。超声诊断仪有各种档次，先进的高档仪器结构复杂，具有高性能、多功能、高分辨率和高清晰度等特点。它们的基本构件包括发射、扫查、接收、信号处理和显示等五个组成部分，分为两大部件，即主机和探头。</p>
            </Row>
          </div>
          
          {/* 光谱说明 */}
          <div className={styles.page2}>
            <Row style={{height: '100%'}}>
              <IntervalTitle title="根据标准组织频率列入一下频率光谱   单位：HZ"/>
              <List list={list}></List>
            </Row>
          </div>
        </div>  
      </div>
     
    );
  }
}

export default App;
