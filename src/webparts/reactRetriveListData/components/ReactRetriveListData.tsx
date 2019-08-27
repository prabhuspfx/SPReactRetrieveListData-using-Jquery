import * as React from 'react';
import styles from './ReactRetriveListData.module.scss';
import { IReactRetriveListDataProps } from './IReactRetriveListDataProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as jQuery from 'jquery';

export interface IReactSpfxState{  
  items:[  
        {  
          "Courses": "", 
          "Credit": "", 
          "Department":"",
        }]  
}  

export default class ReactRetriveListData extends React.Component<IReactRetriveListDataProps, IReactSpfxState> {


  public constructor(props: IReactRetriveListDataProps, state: IReactSpfxState){  
    super(props); 
    
    this.state = {  
      items: [  
        {  
          "Courses": "", 
          "Credit": "", 
          "Department":"",
         
        }  
      ]  
    };  
  }  


  public componentDidMount() {
    setInterval(
     () => this.fetchDatafromSharePointList(),
     1000
   );
 }
  

 private fetchDatafromSharePointList()
{
  var reactHandler = this;  
  jQuery.ajax({  
        url: `${this.props.siteurl}/_api/web/lists/getbytitle('CourseDetails')/items`,  
        type: "GET",  
        headers:{'Accept': 'application/json; odata=verbose;'},  
        success: function(resultData) {  
          /*resultData.d.results;*/  
          reactHandler.setState({  
            items: resultData.d.results  
          });  
        },  
        error : function(jqXHR, textStatus, errorThrown) {  
        }  
    });  
}


  


  public render(): React.ReactElement<IReactRetriveListDataProps> {
    return (
      
      <div className={styles.panelStyle} > 
        
      <div className={styles.tableCaptionStyle} >Fetch 
      Course Details from SharePointList using SPFx,RESTAPI,React JS
        Data on page changes with change in the SharePointList  </div>
     
       <div className={styles.headerCaptionStyle} >Course Details</div>
      <div className={styles.tableStyle} >   
        
        <div className={styles.headerStyle} >  
          <div className={styles.CellStyle}>Courses</div>  
          <div className={styles.CellStyle}>Credit </div>  
          <div className={styles.CellStyle}>Department</div>  
            
                 
        </div>  
        
          {this.state.items.map(function(item,key){  
            
            return (<div className={styles.rowStyle} key={key}>  
                <div className={styles.CellStyle}>{item.Courses}</div>  
                <div className={styles.CellStyle}>{item.Credit}</div>  
                 <div className={styles.CellStyle}>{item.Department}</div>
                  
      
              </div>);  
          })}  
                
      </div>  
    </div>



    );
  }
}
