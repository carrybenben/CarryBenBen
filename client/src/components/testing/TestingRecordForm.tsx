import { useState } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Plus, X, Trash } from 'lucide-react';

// 测试结果项目接口
interface TestResult {
  itemCode: string;
  value: string | number;
  weight?: string | number;
}

// 测试机构接口
interface TestingAgency {
  id: number;
  code: string;
  nameEn: string;
  nameCn: string;
}

// 测试项目接口
interface TestingItem {
  id: number;
  code: string;
  nameEn: string;
  nameCn: string;
  unit: string;
}

// 组件属性接口
export interface TestingRecordFormProps {
  agencies: TestingAgency[];
  testingItems: TestingItem[];
  onSuccess: () => Promise<void>;
}

// 表单验证模式
const testingRecordSchema = z.object({
  agencyId: z.number({
    required_error: 'Please select a testing agency',
  }),
  sampleId: z.string().min(2, {
    message: 'Sample ID must be at least 2 characters',
  }),
  sampleDate: z.date({
    required_error: 'Please select a sample date',
  }),
  sampleLocation: z.string().optional(),
  coalType: z.string().optional(),
  testDate: z.date({
    required_error: 'Please select a test date',
  }),
  testReport: z.string().optional(),
  notes: z.string().optional(),
  status: z.string().default('pending'),
});

type TestingRecordFormValues = z.infer<typeof testingRecordSchema>;

export default function TestingRecordForm({ agencies, testingItems, onSuccess }: TestingRecordFormProps) {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [selectedItemCode, setSelectedItemCode] = useState<string>('');
  const [testValue, setTestValue] = useState<string>('');
  const [testWeight, setTestWeight] = useState<string>('1');

  // 初始化表单
  const form = useForm<TestingRecordFormValues>({
    resolver: zodResolver(testingRecordSchema),
    defaultValues: {
      sampleId: '',
      sampleLocation: '',
      coalType: '',
      testReport: '',
      notes: '',
      status: 'pending',
    },
  });

  // 测试记录提交逻辑
  const mutation = useMutation({
    mutationFn: async (data: TestingRecordFormValues & { results: TestResult[] }) => {
      const formattedData = {
        ...data,
        sampleDate: format(data.sampleDate, 'yyyy-MM-dd'),
        testDate: format(data.testDate, 'yyyy-MM-dd'),
      };
      return apiRequest('POST', '/api/testing-records', formattedData);
    },
    onSuccess: async () => {
      toast({
        title: language === 'en' ? 'Success' : '成功',
        description: language === 'en' ? 'Testing record created successfully' : '测试记录创建成功',
      });
      
      form.reset();
      setTestResults([]);
      await onSuccess();
    },
    onError: (error) => {
      console.error('Error submitting testing record:', error);
      toast({
        title: language === 'en' ? 'Error' : '错误',
        description: language === 'en' ? 'Failed to create testing record' : '创建测试记录失败',
        variant: 'destructive',
      });
    },
  });

  // 添加测试结果项
  const addTestResult = () => {
    if (!selectedItemCode || !testValue) {
      toast({
        title: language === 'en' ? 'Error' : '错误',
        description: language === 'en' ? 'Please select an item and enter a value' : '请选择测试项目并输入数值',
        variant: 'destructive',
      });
      return;
    }

    // 检查是否已存在相同项目的测试结果
    const existingIndex = testResults.findIndex(
      (result) => result.itemCode === selectedItemCode
    );

    if (existingIndex !== -1) {
      // 如果已存在，则更新值
      const updatedResults = [...testResults];
      updatedResults[existingIndex] = {
        itemCode: selectedItemCode,
        value: testValue,
        weight: testWeight || '1',
      };
      setTestResults(updatedResults);
    } else {
      // 如果不存在，则添加新的
      setTestResults([
        ...testResults,
        {
          itemCode: selectedItemCode,
          value: testValue,
          weight: testWeight || '1',
        },
      ]);
    }

    // 重置输入字段
    setSelectedItemCode('');
    setTestValue('');
    setTestWeight('1');
  };

  // 移除测试结果项
  const removeTestResult = (index: number) => {
    const updatedResults = [...testResults];
    updatedResults.splice(index, 1);
    setTestResults(updatedResults);
  };

  // 获取测试项目名称
  const getItemName = (itemCode: string) => {
    const item = testingItems.find((i) => i.code === itemCode);
    if (!item) return itemCode;
    return language === 'en' ? item.nameEn : item.nameCn;
  };

  // 获取测试项目单位
  const getItemUnit = (itemCode: string) => {
    const item = testingItems.find((i) => i.code === itemCode);
    return item?.unit || '';
  };

  // 表单提交处理
  const onSubmit = (data: TestingRecordFormValues) => {
    if (testResults.length === 0) {
      toast({
        title: language === 'en' ? 'Error' : '错误',
        description: language === 'en' ? 'Please add at least one test result' : '请至少添加一项测试结果',
        variant: 'destructive',
      });
      return;
    }

    mutation.mutate({ ...data, results: testResults });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 样本信息区域 */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium border-b pb-2">
              {language === 'en' ? 'Sample Information' : '样本信息'}
            </h3>

            <FormField
              control={form.control}
              name="sampleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{language === 'en' ? 'Sample ID' : '样本ID'}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sampleDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{language === 'en' ? 'Sample Date' : '采样日期'}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={`w-full pl-3 text-left font-normal ${
                            !field.value ? 'text-muted-foreground' : ''
                          }`}
                        >
                          {field.value ? (
                            format(field.value, 'yyyy-MM-dd')
                          ) : (
                            <span>{language === 'en' ? 'Pick a date' : '选择日期'}</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sampleLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{language === 'en' ? 'Sample Location' : '采样地点'}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coalType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{language === 'en' ? 'Coal Type' : '煤炭类型'}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* 测试信息区域 */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium border-b pb-2">
              {language === 'en' ? 'Testing Information' : '测试信息'}
            </h3>

            <FormField
              control={form.control}
              name="agencyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{language === 'en' ? 'Testing Agency' : '测试机构'}</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'en' ? 'Select an agency' : '选择测试机构'} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {agencies.map((agency) => (
                        <SelectItem key={agency.id} value={agency.id.toString()}>
                          {language === 'en' ? agency.nameEn : agency.nameCn}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="testDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{language === 'en' ? 'Test Date' : '测试日期'}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={`w-full pl-3 text-left font-normal ${
                            !field.value ? 'text-muted-foreground' : ''
                          }`}
                        >
                          {field.value ? (
                            format(field.value, 'yyyy-MM-dd')
                          ) : (
                            <span>{language === 'en' ? 'Pick a date' : '选择日期'}</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="testReport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{language === 'en' ? 'Test Report Number' : '测试报告编号'}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{language === 'en' ? 'Notes' : '备注'}</FormLabel>
                  <FormControl>
                    <Textarea className="min-h-[80px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* 测试结果区域 */}
        <div className="pt-6 space-y-4">
          <h3 className="text-lg font-medium border-b pb-2">
            {language === 'en' ? 'Test Results' : '测试结果'}
          </h3>

          {/* 添加测试结果表单 */}
          <div className="flex items-end gap-2 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                {language === 'en' ? 'Test Item' : '测试项目'}
              </label>
              <Select
                value={selectedItemCode}
                onValueChange={setSelectedItemCode}
              >
                <SelectTrigger>
                  <SelectValue placeholder={language === 'en' ? 'Select an item' : '选择测试项目'} />
                </SelectTrigger>
                <SelectContent>
                  {testingItems.map((item) => (
                    <SelectItem key={item.id} value={item.code}>
                      {language === 'en' ? item.nameEn : item.nameCn} ({item.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-[120px]">
              <label className="block text-sm font-medium mb-1">
                {language === 'en' ? 'Value' : '数值'}
              </label>
              <Input
                type="text"
                value={testValue}
                onChange={(e) => setTestValue(e.target.value)}
              />
            </div>

            <div className="w-[100px]">
              <label className="block text-sm font-medium mb-1">
                {language === 'en' ? 'Weight' : '权重'}
              </label>
              <Input
                type="text"
                value={testWeight}
                onChange={(e) => setTestWeight(e.target.value)}
              />
            </div>

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={addTestResult}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* 测试结果列表 */}
          {testResults.length > 0 ? (
            <div className="border rounded-md overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-2 pl-3">
                      {language === 'en' ? 'Item' : '项目'}
                    </th>
                    <th className="text-left p-2">
                      {language === 'en' ? 'Value' : '数值'}
                    </th>
                    <th className="text-left p-2">
                      {language === 'en' ? 'Unit' : '单位'}
                    </th>
                    <th className="text-left p-2">
                      {language === 'en' ? 'Weight' : '权重'}
                    </th>
                    <th className="w-10 p-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {testResults.map((result, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-2 pl-3">{getItemName(result.itemCode)}</td>
                      <td className="p-2">{result.value}</td>
                      <td className="p-2">{getItemUnit(result.itemCode)}</td>
                      <td className="p-2">{result.weight || '1'}</td>
                      <td className="p-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeTestResult(index)}
                        >
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-6 border rounded-md bg-muted/20">
              <p className="text-muted-foreground">
                {language === 'en'
                  ? 'No test results added yet. Add at least one test result.'
                  : '尚未添加测试结果。请至少添加一项测试结果。'}
              </p>
            </div>
          )}
        </div>

        {/* 提交按钮 */}
        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            className="min-w-[120px]"
            disabled={mutation.isPending}
          >
            {mutation.isPending
              ? language === 'en'
                ? 'Submitting...'
                : '提交中...'
              : language === 'en'
              ? 'Submit Record'
              : '提交记录'}
          </Button>
        </div>
      </form>
    </Form>
  );
}