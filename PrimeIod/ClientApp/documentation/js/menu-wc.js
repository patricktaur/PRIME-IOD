'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">icon-prism-core documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppAdminModule.html" data-type="entity-link">AppAdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppAdminModule-60480e14800f12792d36a5c1200585f4"' : 'data-target="#xs-components-links-module-AppAdminModule-60480e14800f12792d36a5c1200585f4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppAdminModule-60480e14800f12792d36a5c1200585f4"' :
                                            'id="xs-components-links-module-AppAdminModule-60480e14800f12792d36a5c1200585f4"' }>
                                            <li class="link">
                                                <a href="components/RolesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RolesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RolesFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RolesFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppAdminRoutingModule.html" data-type="entity-link">AppAdminRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-cdece333ad000722157f4b63120960e0"' : 'data-target="#xs-components-links-module-AppModule-cdece333ad000722157f4b63120960e0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-cdece333ad000722157f4b63120960e0"' :
                                            'id="xs-components-links-module-AppModule-cdece333ad000722157f4b63120960e0"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NoaccessComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NoaccessComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UpdateSwToastComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UpdateSwToastComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-cdece333ad000722157f4b63120960e0"' : 'data-target="#xs-injectables-links-module-AppModule-cdece333ad000722157f4b63120960e0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-cdece333ad000722157f4b63120960e0"' :
                                        'id="xs-injectables-links-module-AppModule-cdece333ad000722157f4b63120960e0"' }>
                                        <li class="link">
                                            <a href="injectables/CommonService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CommonService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ModalService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ModalService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ToastService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ToastService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link">CoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link">HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomeModule-5a3cffaa5324a88460a45b175bc75395"' : 'data-target="#xs-components-links-module-HomeModule-5a3cffaa5324a88460a45b175bc75395"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-5a3cffaa5324a88460a45b175bc75395"' :
                                            'id="xs-components-links-module-HomeModule-5a3cffaa5324a88460a45b175bc75395"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeRoutingModule.html" data-type="entity-link">HomeRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoginModule.html" data-type="entity-link">LoginModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoginModule-502dabf42a207b13ca207fd5574db7c5"' : 'data-target="#xs-components-links-module-LoginModule-502dabf42a207b13ca207fd5574db7c5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginModule-502dabf42a207b13ca207fd5574db7c5"' :
                                            'id="xs-components-links-module-LoginModule-502dabf42a207b13ca207fd5574db7c5"' }>
                                            <li class="link">
                                                <a href="components/EmailTokenLoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EmailTokenLoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotRegisteredComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotRegisteredComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SmsOtpLoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SmsOtpLoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserNamePwdLoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserNamePwdLoginComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginRoutingModule.html" data-type="entity-link">LoginRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MastersModule.html" data-type="entity-link">MastersModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MastersRoutingModule.html" data-type="entity-link">MastersRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PrismModule.html" data-type="entity-link">PrismModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PrismModule-d9c2d166f21e1cf6336da3651ea2464f"' : 'data-target="#xs-components-links-module-PrismModule-d9c2d166f21e1cf6336da3651ea2464f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PrismModule-d9c2d166f21e1cf6336da3651ea2464f"' :
                                            'id="xs-components-links-module-PrismModule-d9c2d166f21e1cf6336da3651ea2464f"' }>
                                            <li class="link">
                                                <a href="components/FilterOneComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterOneComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FilterTwoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterTwoComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReportsModule.html" data-type="entity-link">ReportsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ReportsModule-f75052b904066b30c70d03ced4b06905"' : 'data-target="#xs-components-links-module-ReportsModule-f75052b904066b30c70d03ced4b06905"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ReportsModule-f75052b904066b30c70d03ced4b06905"' :
                                            'id="xs-components-links-module-ReportsModule-f75052b904066b30c70d03ced4b06905"' }>
                                            <li class="link">
                                                <a href="components/OmrReportComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OmrReportComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProjectReviewComplianceComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProjectReviewComplianceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProjectReviewComplianceListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProjectReviewComplianceListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReportBaseComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ReportBaseComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReportShellComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ReportShellComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReportsRoutingModule.html" data-type="entity-link">ReportsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedCompsModule.html" data-type="entity-link">SharedCompsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedCompsModule-406737bffad133a8cc452d2dd00bc449"' : 'data-target="#xs-components-links-module-SharedCompsModule-406737bffad133a8cc452d2dd00bc449"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedCompsModule-406737bffad133a8cc452d2dd00bc449"' :
                                            'id="xs-components-links-module-SharedCompsModule-406737bffad133a8cc452d2dd00bc449"' }>
                                            <li class="link">
                                                <a href="components/DataTableShellNDynamicFiltersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DataTableShellNDynamicFiltersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReportDownloadComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ReportDownloadComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudyFilterShellComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StudyFilterShellComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudyFiltersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StudyFiltersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudyReviewFilterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StudyReviewFilterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-26e1d332fc6e8ac53e5e09c24123301a"' : 'data-target="#xs-components-links-module-SharedModule-26e1d332fc6e8ac53e5e09c24123301a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-26e1d332fc6e8ac53e5e09c24123301a"' :
                                            'id="xs-components-links-module-SharedModule-26e1d332fc6e8ac53e5e09c24123301a"' }>
                                            <li class="link">
                                                <a href="components/CellComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CellComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ColumnManagerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ColumnManagerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConfirmationModalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ConfirmationModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DataTableBaseComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DataTableBaseComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DataTableShellComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DataTableShellComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DropDownComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DropDownComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PaginationControlComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PaginationControlComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TextBoxComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextBoxComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ToastComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ToastComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-SharedModule-26e1d332fc6e8ac53e5e09c24123301a"' : 'data-target="#xs-directives-links-module-SharedModule-26e1d332fc6e8ac53e5e09c24123301a"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-SharedModule-26e1d332fc6e8ac53e5e09c24123301a"' :
                                        'id="xs-directives-links-module-SharedModule-26e1d332fc6e8ac53e5e09c24123301a"' }>
                                        <li class="link">
                                            <a href="directives/HasPermissionsDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">HasPermissionsDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/PlaceholderDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">PlaceholderDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-SharedModule-26e1d332fc6e8ac53e5e09c24123301a"' : 'data-target="#xs-pipes-links-module-SharedModule-26e1d332fc6e8ac53e5e09c24123301a"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-SharedModule-26e1d332fc6e8ac53e5e09c24123301a"' :
                                            'id="xs-pipes-links-module-SharedModule-26e1d332fc6e8ac53e5e09c24123301a"' }>
                                            <li class="link">
                                                <a href="pipes/YesNoPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">YesNoPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ShellModule.html" data-type="entity-link">ShellModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ShellModule-995023e26c5fb8b7b6fbe1a1dbfe5749"' : 'data-target="#xs-components-links-module-ShellModule-995023e26c5fb8b7b6fbe1a1dbfe5749"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ShellModule-995023e26c5fb8b7b6fbe1a1dbfe5749"' :
                                            'id="xs-components-links-module-ShellModule-995023e26c5fb8b7b6fbe1a1dbfe5749"' }>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReportsMenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ReportsMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RisksMenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RisksMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShellComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ShellComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudyMenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StudyMenuComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StudyGroupModule.html" data-type="entity-link">StudyGroupModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StudyGroupRoutingModule.html" data-type="entity-link">StudyGroupRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StudyRoutingModule.html" data-type="entity-link">StudyRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TblAnnouncementsModule.html" data-type="entity-link">TblAnnouncementsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TblAnnouncementsModule-ae7b598b06ce807ecb5a53a965efe7c7"' : 'data-target="#xs-components-links-module-TblAnnouncementsModule-ae7b598b06ce807ecb5a53a965efe7c7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TblAnnouncementsModule-ae7b598b06ce807ecb5a53a965efe7c7"' :
                                            'id="xs-components-links-module-TblAnnouncementsModule-ae7b598b06ce807ecb5a53a965efe7c7"' }>
                                            <li class="link">
                                                <a href="components/TblAnnouncementsEditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TblAnnouncementsEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TblAnnouncementsListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TblAnnouncementsListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TblParamModule.html" data-type="entity-link">TblParamModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TblParamModule-bad07a061e9ddc77d0cdaf88b43662fc"' : 'data-target="#xs-components-links-module-TblParamModule-bad07a061e9ddc77d0cdaf88b43662fc"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TblParamModule-bad07a061e9ddc77d0cdaf88b43662fc"' :
                                            'id="xs-components-links-module-TblParamModule-bad07a061e9ddc77d0cdaf88b43662fc"' }>
                                            <li class="link">
                                                <a href="components/TblParamEditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TblParamEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TblParamListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TblParamListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TblStudyModule.html" data-type="entity-link">TblStudyModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TblStudyModule-5912287e73fc191edabb9e4d85e594eb"' : 'data-target="#xs-components-links-module-TblStudyModule-5912287e73fc191edabb9e4d85e594eb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TblStudyModule-5912287e73fc191edabb9e4d85e594eb"' :
                                            'id="xs-components-links-module-TblStudyModule-5912287e73fc191edabb9e4d85e594eb"' }>
                                            <li class="link">
                                                <a href="components/AssumptionsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AssumptionsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StudyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TblStudyEditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TblStudyEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TblStudyListCachedComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TblStudyListCachedComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TblStudyListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TblStudyListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TblTaskCategoryModule.html" data-type="entity-link">TblTaskCategoryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TblTaskCategoryModule-89f168c3323825a53d3db70acae570d8"' : 'data-target="#xs-components-links-module-TblTaskCategoryModule-89f168c3323825a53d3db70acae570d8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TblTaskCategoryModule-89f168c3323825a53d3db70acae570d8"' :
                                            'id="xs-components-links-module-TblTaskCategoryModule-89f168c3323825a53d3db70acae570d8"' }>
                                            <li class="link">
                                                <a href="components/TblTaskCategoryEditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TblTaskCategoryEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TblTaskCategoryListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TblTaskCategoryListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TblUserModule.html" data-type="entity-link">TblUserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TblUserModule-1d7da8dd177afa28d31edbc3b14cfd3f"' : 'data-target="#xs-components-links-module-TblUserModule-1d7da8dd177afa28d31edbc3b14cfd3f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TblUserModule-1d7da8dd177afa28d31edbc3b14cfd3f"' :
                                            'id="xs-components-links-module-TblUserModule-1d7da8dd177afa28d31edbc3b14cfd3f"' }>
                                            <li class="link">
                                                <a href="components/TblUserEditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TblUserEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TblUserListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TblUserListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/DataTableShellNDynamicFiltersComponent.html" data-type="entity-link">DataTableShellNDynamicFiltersComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RolesComponent.html" data-type="entity-link">RolesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RolesFormComponent.html" data-type="entity-link">RolesFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/StudyFiltersComponent.html" data-type="entity-link">StudyFiltersComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserFormComponent.html" data-type="entity-link">UserFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UsersComponent.html" data-type="entity-link">UsersComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppSharedPage.html" data-type="entity-link">AppSharedPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpInterceptorHandler.html" data-type="entity-link">HttpInterceptorHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/Logger.html" data-type="entity-link">Logger</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginPage.html" data-type="entity-link">LoginPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/MockAuthenticationService.html" data-type="entity-link">MockAuthenticationService</a>
                            </li>
                            <li class="link">
                                <a href="classes/MockCredentialsService.html" data-type="entity-link">MockCredentialsService</a>
                            </li>
                            <li class="link">
                                <a href="classes/Permission.html" data-type="entity-link">Permission</a>
                            </li>
                            <li class="link">
                                <a href="classes/Role.html" data-type="entity-link">Role</a>
                            </li>
                            <li class="link">
                                <a href="classes/RouteReusableStrategy.html" data-type="entity-link">RouteReusableStrategy</a>
                            </li>
                            <li class="link">
                                <a href="classes/Shell.html" data-type="entity-link">Shell</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShellPage.html" data-type="entity-link">ShellPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserEdit.html" data-type="entity-link">UserEdit</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserLogin.html" data-type="entity-link">UserLogin</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppAdminService.html" data-type="entity-link">AppAdminService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthenticationService.html" data-type="entity-link">AuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CommonService.html" data-type="entity-link">CommonService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CredentialsService.html" data-type="entity-link">CredentialsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataServiceService.html" data-type="entity-link">DataServiceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DBkeys.html" data-type="entity-link">DBkeys</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilterComponentService.html" data-type="entity-link">FilterComponentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpCacheService.html" data-type="entity-link">HttpCacheService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpService.html" data-type="entity-link">HttpService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/I18nService.html" data-type="entity-link">I18nService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtHelper.html" data-type="entity-link">JwtHelper</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStoreManager.html" data-type="entity-link">LocalStoreManager</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ModalService.html" data-type="entity-link">ModalService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PaginationControlsService.html" data-type="entity-link">PaginationControlsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/QuillService.html" data-type="entity-link">QuillService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/QuoteService.html" data-type="entity-link">QuoteService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharedCompsService.html" data-type="entity-link">SharedCompsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StudyEditService.html" data-type="entity-link">StudyEditService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StudyEditService-1.html" data-type="entity-link">StudyEditService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StudyReportService.html" data-type="entity-link">StudyReportService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TblAnnouncementsService.html" data-type="entity-link">TblAnnouncementsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TblParamService.html" data-type="entity-link">TblParamService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TblStudyService.html" data-type="entity-link">TblStudyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TblTaskCategoryService.html" data-type="entity-link">TblTaskCategoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TblUserService.html" data-type="entity-link">TblUserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ToastService.html" data-type="entity-link">ToastService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UpdateService.html" data-type="entity-link">UpdateService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/Utilities.html" data-type="entity-link">Utilities</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/ApiPrefixInterceptor.html" data-type="entity-link">ApiPrefixInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/CacheInterceptor.html" data-type="entity-link">CacheInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/ErrorHandlerInterceptor.html" data-type="entity-link">ErrorHandlerInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/TokenInterceptor.html" data-type="entity-link">TokenInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/WinAuthInterceptor.html" data-type="entity-link">WinAuthInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthenticationGuard.html" data-type="entity-link">AuthenticationGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AssignedUser.html" data-type="entity-link">AssignedUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Credentials.html" data-type="entity-link">Credentials</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HttpCacheEntry.html" data-type="entity-link">HttpCacheEntry</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HttpClient.html" data-type="entity-link">HttpClient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IdToken.html" data-type="entity-link">IdToken</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFilter.html" data-type="entity-link">IFilter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginContext.html" data-type="entity-link">LoginContext</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginResponse.html" data-type="entity-link">LoginResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RandomQuoteContext.html" data-type="entity-link">RandomQuoteContext</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Study.html" data-type="entity-link">Study</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StudyFilter.html" data-type="entity-link">StudyFilter</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});