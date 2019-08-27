import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'ReactRetriveListDataWebPartStrings';
import ReactRetriveListData from './components/ReactRetriveListData';
import { IReactRetriveListDataProps } from './components/IReactRetriveListDataProps';

export interface IReactRetriveListDataWebPartProps {
  description: string;
  
}

export default class ReactRetriveListDataWebPart extends BaseClientSideWebPart<IReactRetriveListDataWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReactRetriveListDataProps > = React.createElement(
      ReactRetriveListData,
      {
        description: this.properties.description, 
        siteurl: this.context.pageContext.web.absoluteUrl
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
