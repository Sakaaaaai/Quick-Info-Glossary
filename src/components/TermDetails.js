import React from 'react';

import BinarySearchVisualization from '../data/BinarySearchVisualization';
import LinearSearchVisualization from '../data/LinearSearchVisualization';
import RollbackVisualization from '../data/RollbackVisualization';
import IDE from '../data/IDE';
import BubbleSortVisualization from '../data/BubbleSort';
import CompilerVisualization from '../data/Compiler';
import InterpreterVisualization from '../data/Interpreter';
import MonteCarloVisualization from '../data/MonteCarlo';
import MorphologicalAnalysis from '../data/MorphologicalAnalysis';
import HttpVisualization from '../data/Http';
import CookieExplanation from '../data/CookieExplanation';
import ParityBitExplanation from '../data/ParityBitExplanation';
import RunLengthEncodingVisualization from '../data/RunLength';
import EntropyEncodingVisualization from '../data/EntropyEncoding';
import QueueVisualization from '../data/QueueVisualization';
import HttpsVisualization from '../data/Https';
import AffordanceVisualization from '../data/AffordanceVisualization';
import UbiquitousComputingVisualization from '../data/UbiquitousComputing';
import CrossCheckVisualization from '../data/CrossCheckVisualization';
import UIDesignVisualization from '../data/UIDesign';
import EnhancedDNSVisualization from '../data/DNS';
import CGMVisualization from '../data/CGM';
import TCPIPVisualization from '../data/TCPIPVisualization';
import BiometricsDemo from '../data/Biometrics';
import SSLTLSVisualization from '../data/SSLTLS';
import TimeShareVisualization from '../data/TimeShareVisualization';
import TextMiningVisualization from '../data/TextMiningVisualization';
import DigitalSignatureVisualization from '../data/DigitalSignatureVisualization';
import TwosComplementVisualization from '../data/TwosComplementVisualization';
import PDCACycleVisualization from '../data/PDCACycleVisualization';
import DomainExplanation from '../data/DomainExplanation';
import IPAddressExplanation from '../data/IPAddressExplanation';
import NetworkExplanation from '../data/NetworkExplanation';
import WorldWideWebExplanation from '../data/WorldWideWebExplanation';
import PacketCommunicationVisualization from '../data/PacketCommunicationVisualization';
import URLVisualization from '../data/URLVisualization';
import SecurityTriadVisualization from '../data/SecurityTriadVisualization';
import DetailedSymmetricEncryption from '../data/DetailedSymmetricEncryption';
import DoSAttackVisualization from '../data/DoSAttackVisualization';
import TwoFactorAuthDemo from '../data/TwoFactorAuthDemo';
import FirewallVisualization from '../data/FirewallVisualization';
import PhishingEducationSteps from '../data/PhishingEducationSteps';
import DigitalDivideEducation from '../data/DigitalDivideEducation';
import InformationClassificationDemo from '../data/InformationClassificationDemo';
import AnalogSignalVisualization from '../data/AnalogSignalVisualization';
import DigitalSignalBasic from '../data/DigitalSignalBasic';
import ReversibleIrreversibleDemo from '../data/ReversibleIrreversibleDemo';
import SamplingVisualization from '../data/SamplingVisualization';
import PCMVisualization from '../data/PCMVisualization';
import QuantizationVisualization from '../data/QuantizationVisualization';
import EncodingVisualization from '../data/EncodingVisualization';
import ZipVisualization from '../data/ZipVisualization';
import MalwareVisualization from '../data/MalwareVisualization';
import PublicKeyEncryption from '../data/PublicKeyEncryption';
import POSVisualization from '../data/POSVisualization';
import RasterVisualization from '../data/RasterVisualization';
import RGBColorVisualization from '../data/RGBColorVisualization';
import ResolutionVisualization from '../data/ResolutionVisualization';
import HexadecimalVisualization from '../data/HexadecimalVisualization';
import BinaryVisualization from '../data/BinaryVisualization';
import BitOperationsVisualizer from '../data/BitOperationsVisualizer';
import SignedNumberVisualization from '../data/SignedNumberVisualization';
import JISCodeVisualization from '../data/JISCodeVisualization';
import UnicodeVisualization from '../data/UnicodeVisualization';
import OutlierVisualization from '../data/OutlierVisualization';
import BigDataVisualization from '../data/BigDataVisualization';
import OpenDataVisualization from '../data/OpenDataVisualization';
import UniversalDesignTutorial from '../data/UniversalDesignTutorial';
import AIExplanation from '../data/AIExplanation';
import OverviewOfMachineLearning from '../data/OverviewOfMachineLearning';
import FrequencyDistributionVisualization from '../data/FrequencyDistributionVisualization';
import DXVisualization from '../data/DXVisualization';
import CloudComputingVisualization from '../data/CloudComputingVisualization';
import BluetoothVisualization from '../data/BluetoothVisualization';
import VLANVisualization from '../data/VLANVisualization';
import CaesarCipherVisualization from '../data/CaesarCipherVisualization';
import SMTPVisualization from '../data/SMTPVisualization';
import FloatingPointVisualization from '../data/FloatingPointVisualization';
import NumericalErrorVisualization from '../data/NumericalErrorVisualization';
import SubtractiveColorMixing from '../data/SubtractiveColorMixing';
import DataAugmentationTutorial from '../data/DataAugmentationTutorial';
import VRVisualization from '../data/VRVisualization';
import CreativeCommonsVisualizer from '../data/CreativeCommonsVisualizer';
import RAMVisualization from '../data/RAMVisualization';
import ROMVisualization from '../data/ROMVisualization';
import SensitiveDataDemo from '../data/SensitiveDataDemo';
import SocialEngineeringVisualization from '../data/SocialEngineeringVisualization';
import ParentalControlVisualization from '../data/ParentalControlVisualization';
import MTBFVisualization from '../data/MTBFVisualization';
import NoSQLVisualization from '../data/NoSQLVisualization';
import MTTRVisualization from '../data/MTTRVisualization';
import MultiprocessorVisualization from '../data/MultiprocessorVisualization';
import PrivacyLawVisualization from '../data/PrivacyLawVisualization';
import CopyrightBasics from '../data/CopyrightBasics';
import IPRightsVisualization from '../data/IPRightsVisualization';
import IPVisualization from '../data/IPVisualization';
import UtilityModelVisualization from '../data/UtilityModelVisualization';
import PatentRightVisualization from '../data/PatentRightVisualization';
import TrademarkRightVisualization from '../data/TrademarkRightVisualization';
import DesignRightVisualization from '../data/DesignRightVisualization';
import PortraitRightsVisualization from '../data/PortraitRightsVisualization';
import DIKWVisualization from '../data/DIKWVisualization';

const TermDetails = ({ selectedTerm, startQuiz }) => {
  return (
    <div className="px-0 py-10 bg-white rounded-lg shadow-md w-full mx-auto mt-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
        <h2 className="text-2xl md:text-3xl font-bold flex items-center">
          {selectedTerm.name}
        </h2>
        <button
          className="bg-green-500 text-white px-4 py-2 md:px-6 md:py-3 rounded transition-colors duration-200 hover:bg-green-600 w-full sm:w-auto whitespace-nowrap"
          onClick={startQuiz}
        >
          確認クイズ
        </button>
      </div>
      <p className="text-xl mb-4">{selectedTerm.description}</p>
      <div dangerouslySetInnerHTML={{ __html: selectedTerm.content }} className="text-lg mb-6" />
      {selectedTerm.name === "二分法探索" && <BinarySearchVisualization />}
      {selectedTerm.name === "統合開発環境 (IDE)" && <IDE />}
      {selectedTerm.name === "単純前方探索（線形探索）" && <LinearSearchVisualization />}
      {selectedTerm.name === "バブルソート" && <BubbleSortVisualization />}
      {selectedTerm.name === "トランザクションとロールバック" && <RollbackVisualization />}
      {selectedTerm.name === "コンパイラ" && <CompilerVisualization />}
      {selectedTerm.name === "インタプリタ" && <InterpreterVisualization />}
      {selectedTerm.name === "モンテカルロ法" && <MonteCarloVisualization />}
      {selectedTerm.name === "形態素解析" && <MorphologicalAnalysis />}
      {selectedTerm.name === "HTTP" && <HttpVisualization />}
      {selectedTerm.name === "クッキー" && <CookieExplanation />}
      {selectedTerm.name === "パリティビット" && <ParityBitExplanation />}
      {selectedTerm.name === "ランレングス法" && <RunLengthEncodingVisualization />}
      {selectedTerm.name === "エントロピー符号化" && <EntropyEncodingVisualization />}
      {selectedTerm.name === "待ち行列" && <QueueVisualization />}
      {selectedTerm.name === "HTTPS" && <HttpsVisualization />}
      {selectedTerm.name === "アフォーダンス" && <AffordanceVisualization />}
      {selectedTerm.name === "ユビキタスコンピューティング" && <UbiquitousComputingVisualization />}
      {selectedTerm.name === "クロスチェック" && <CrossCheckVisualization />}
      {selectedTerm.name === "UI" && <UIDesignVisualization />}
      {selectedTerm.name === "DNS" && <EnhancedDNSVisualization />}
      {selectedTerm.name === "CGM" && <CGMVisualization />}
      {selectedTerm.name === "TCP/IPプロトコル" && <TCPIPVisualization />}
      {selectedTerm.name === "バイオメトリクス認証" && <BiometricsDemo />}
      {selectedTerm.name === "SSL/TLS" && <SSLTLSVisualization />}
      {selectedTerm.name === "タイムシェアリング" && <TimeShareVisualization />}
      {selectedTerm.name === "テキストマイニング" && <TextMiningVisualization />}
      {selectedTerm.name === "デジタル署名" && <DigitalSignatureVisualization />}
      {selectedTerm.name === "２の補数表現" && <TwosComplementVisualization />}
      {selectedTerm.name === "PDCAサイクル" && <PDCACycleVisualization />}
      {selectedTerm.name === "ドメイン" && <DomainExplanation />}
      {selectedTerm.name === "IPアドレス" && <IPAddressExplanation />}
      {selectedTerm.name === "LANとWAN" && <NetworkExplanation />}
      {selectedTerm.name === "ワールドワイドウェブ" && <WorldWideWebExplanation />}
      {selectedTerm.name === "パケット通信" && <PacketCommunicationVisualization />}
      {selectedTerm.name === "URL" && <URLVisualization />}
      {selectedTerm.name === "情報セキュリティの三要素" && <SecurityTriadVisualization />}
      {selectedTerm.name === "共通鍵暗号" && <DetailedSymmetricEncryption />}
      {selectedTerm.name === "DoS攻撃" && <DoSAttackVisualization />}
      {selectedTerm.name === "二段階認証" && <TwoFactorAuthDemo />}
      {selectedTerm.name === "ファイアウォール" && <FirewallVisualization />}
      {selectedTerm.name === "フィッシング" && <PhishingEducationSteps />}
      {selectedTerm.name === "デジタルデバイド" && <DigitalDivideEducation />}
      {selectedTerm.name === "一次情報と二次情報" && <InformationClassificationDemo />}
      {selectedTerm.name === "アナログ信号" && <AnalogSignalVisualization />}
      {selectedTerm.name === "デジタル信号" && <DigitalSignalBasic />}
      {selectedTerm.name === "可逆形式と非可逆形式" && <ReversibleIrreversibleDemo />}
      {selectedTerm.name === "標本化" && <SamplingVisualization />}
      {selectedTerm.name === "量子化" && <QuantizationVisualization />}
      {selectedTerm.name === "符号化" && <EncodingVisualization />}
      {selectedTerm.name === "PCM方式" && <PCMVisualization />}
      {selectedTerm.name === "ZIP" && <ZipVisualization />}
      {selectedTerm.name === "マルウェア" && <MalwareVisualization />}
      {selectedTerm.name === "公開鍵暗号" && <PublicKeyEncryption />}
      {selectedTerm.name === "POSシステム" && <POSVisualization />}
      {selectedTerm.name === "ラスタ形式" && <RasterVisualization />}
      {selectedTerm.name === "光の三原色" && <RGBColorVisualization />}
      {selectedTerm.name === "解像度" && <ResolutionVisualization />}
      {selectedTerm.name === "16進数" && <HexadecimalVisualization />}
      {selectedTerm.name === "2進数" && <BinaryVisualization />}
      {selectedTerm.name === "ビット" && <BitOperationsVisualizer />}
      {selectedTerm.name === "符号ビット" && <SignedNumberVisualization />}
      {selectedTerm.name === "JISコード" && <JISCodeVisualization />}
      {selectedTerm.name === "ユニコード" && <UnicodeVisualization />}
      {selectedTerm.name === "外れ値" && <OutlierVisualization />}
      {selectedTerm.name === "ビッグデータ" && <BigDataVisualization />}
      {selectedTerm.name === "オープンデータ" && <OpenDataVisualization />}
      {selectedTerm.name === "ユニバーサルデザイン" && <UniversalDesignTutorial />}
      {selectedTerm.name === "人工知能" && <AIExplanation />}
      {selectedTerm.name === "機械学習" && <OverviewOfMachineLearning />}
      {selectedTerm.name === "度数分布表" && <FrequencyDistributionVisualization />}
      {selectedTerm.name === "デジタルトランスフォーメーション" && <DXVisualization />}
      {selectedTerm.name === "クラウドコンピューティング" && <CloudComputingVisualization />}
      {selectedTerm.name === "Bluetooth" && <BluetoothVisualization />}
      {selectedTerm.name === "VLAN" && <VLANVisualization />}
      {selectedTerm.name === "シーザー暗号" && <CaesarCipherVisualization />}
      {selectedTerm.name === "SMTP" && <SMTPVisualization />}
      {selectedTerm.name === "丸め誤差" && <FloatingPointVisualization />}
      {selectedTerm.name === "桁落ち誤差" && <NumericalErrorVisualization />}
      {selectedTerm.name === "色の三原色" && <SubtractiveColorMixing />}
      {selectedTerm.name === "データオーグメンテーション" && <DataAugmentationTutorial />}
      {selectedTerm.name === "VR" && <VRVisualization />}
      {selectedTerm.name === "クリエイティブ・コモンズ" && <CreativeCommonsVisualizer />}
      {selectedTerm.name === "RAM" && <RAMVisualization />}
      {selectedTerm.name === "ROM" && <ROMVisualization />}
      {selectedTerm.name === "要配慮個人情報" && <SensitiveDataDemo />}
      {selectedTerm.name === "ソーシャルエンジニアリング" && <SocialEngineeringVisualization />}
      {selectedTerm.name === "ペアレンタルコントロール" && <ParentalControlVisualization />}
      {selectedTerm.name === "MTBF" && <MTBFVisualization />}
      {selectedTerm.name === "NoSQLデータベース" && <NoSQLVisualization />}
      {selectedTerm.name === "MTTR" && <MTTRVisualization />}
      {selectedTerm.name === "マルチプロセッサ" && <MultiprocessorVisualization />}
      {selectedTerm.name === "個人情報保護法" && <PrivacyLawVisualization />}
      {selectedTerm.name === "著作権" && <CopyrightBasics />}
      {selectedTerm.name === "産業財産権" && <IPRightsVisualization />}
      {selectedTerm.name === "知的財産権" && <IPVisualization />}
      {selectedTerm.name === "実用新案権" && <UtilityModelVisualization />}
      {selectedTerm.name === "特許権" && <PatentRightVisualization />}
      {selectedTerm.name === "商標権" && <TrademarkRightVisualization />}
      {selectedTerm.name === "意匠権" && <DesignRightVisualization />}
      {selectedTerm.name === "肖像権" && <PortraitRightsVisualization />}
      {selectedTerm.name === "DIKWモデル" && <DIKWVisualization />}
    </div>
  );
};

export default TermDetails;